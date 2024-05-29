import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, IMAGES_BUCKET_NAME, NODE_ENV } from 'config';
import { Image } from 'entities';
import { IImageData, IImageDataSource, IRawImage } from 'interfaces';
import { FindManyOptions, ObjectId, Repository } from 'typeorm';
import { Metadata } from 'types';

import { ImagesModel } from '../models';
import { MongoSource } from '../source';

const credentials =
  NODE_ENV === 'local'
    ? {
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      }
    : {};

export class ImageDataSource implements IImageDataSource {
  private s3Client: S3Client;
  private imageRepository: Repository<ImagesModel>;

  constructor() {
    this.s3Client = new S3Client({ region: AWS_REGION, ...credentials });
    this.imageRepository = MongoSource.getRepository(ImagesModel);
  }

  async uploadImage(Body: Buffer, metadata: Metadata, folder: string = '') {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: IMAGES_BUCKET_NAME,
        Key: `${folder}/${metadata.originalname}`, // Use a unique name for the file
        Body,
        ContentType: metadata.mimetype,
      },
    });

    return upload.done();
  }

  async findOneById(id: string) {
    const data: IRawImage = await this.imageRepository.findOneBy({ _id: new ObjectId(id) });
    return data && Image.toDomain(data);
  }

  async create(data: IImageData) {
    const event = new ImagesModel(data);

    const saved = await this.imageRepository.save(event);

    return Image.toDomain(saved);
  }

  async findOne(criteria: Partial<IImageData>) {
    const event = await this.imageRepository.findOneByOrFail(criteria);
    return Image.toDomain(event);
  }

  async findAll(criteria: Partial<IImageData>) {
    const params: FindManyOptions<ImagesModel> = Object.keys(criteria).length ? { where: criteria } : {};
    const [data, count] = await Promise.all([this.imageRepository.find(params), this.imageRepository.count(params)]);

    return {
      count,
      data: Image.toBatchDomain(data),
    };
  }
}
