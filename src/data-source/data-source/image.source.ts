import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, IMAGES_BUCKET_NAME, NODE_ENV } from 'config';
import { Image } from 'entities';
import { IImageData, IImageDataSource } from 'interfaces';
import { ObjectId } from 'typeorm';
import { type AlbumsQuery, Metadata } from 'types';

import { ImagesModel } from '../models';
import { BaseDataSource } from './base.source';

const credentials =
  NODE_ENV === 'local'
    ? {
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      }
    : {};

export class ImageDataSource extends BaseDataSource<ImagesModel, Image, IImageData> implements IImageDataSource {
  private s3Client: S3Client;

  constructor() {
    super(ImagesModel, Image);
    this.s3Client = new S3Client({ region: AWS_REGION, ...credentials });
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

  async getAlbums(query: AlbumsQuery) {
    const $match = {};
    if (query?.name) {
      Object.assign($match, { album: { $regex: query.name, $options: 'i' } });
    }
    if (query?.type) {
      Object.assign($match, { type: query.type });
    }

    return this.repository
      .aggregate([
        { $match },
        {
          $group: { _id: '$album', image: { $first: '$$ROOT' }, count: { $sum: 1 } },
        },
      ])
      .toArray() as unknown as Promise<{ _id: ObjectId; image: IImageData; count: number }[]>;
  }
}
