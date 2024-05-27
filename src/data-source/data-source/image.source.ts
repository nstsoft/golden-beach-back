import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, IMAGES_BUCKET_NAME, NODE_ENV } from 'config';
import { IImageDataSource } from 'interfaces';
import { Metadata } from 'types';

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

  constructor() {
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
}
