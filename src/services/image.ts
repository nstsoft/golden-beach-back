import { IImageDataSource, IImageService } from 'interfaces';
import sharp from 'sharp';
import { File, Metadata } from 'types';

export class ImageService implements IImageService {
  constructor(private imageDataSource: IImageDataSource) {}

  async sharpImage(file: Buffer) {
    return sharp(file).jpeg({ quality: 30 }).toBuffer();
  }

  async uploadImage(file: Buffer, metadata: Metadata, folder?: string) {
    return this.imageDataSource.uploadImage(file, metadata, folder);
  }

  getMetadata(file: File, isThumb?: boolean) {
    return {
      mimetype: file.mimetype,
      originalname: `${isThumb ? 'thumb_' : ''}${file.originalname}`,
    };
  }
}
