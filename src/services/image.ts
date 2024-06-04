import { IImageData, IImageDataSource, IImageService } from 'interfaces';
import sharp from 'sharp';
import { File, ImageType, Metadata, Pagination } from 'types';

export class ImageService implements IImageService {
  constructor(private imageDataSource: IImageDataSource) {}

  async sharpImage(file: Buffer, quality: number = 30) {
    return sharp(file).jpeg({ quality }).toBuffer();
  }

  async sharpAndCropImage(
    file: Buffer,
    { width, height, quality = 100 }: { width: number; height: number; quality?: number },
  ) {
    return sharp(file).resize(width, height, { fit: 'cover' }).toFormat('webp', { quality }).toBuffer();
  }

  async uploadImage(file: Buffer, metadata: Metadata, folder?: string) {
    return this.imageDataSource.uploadImage(file, metadata, folder);
  }

  getMetadata(file: File, isThumb?: boolean) {
    let name = file.originalname;
    const splitted = file.originalname.split('.');
    splitted[splitted.length - 1] = 'webp';
    name = splitted.join('.');

    return {
      mimetype: file.mimetype,
      originalname: `${isThumb ? 'thumb_' : ''}${name}`,
    };
  }

  findById(id: string) {
    return this.imageDataSource.findOneById(id);
  }

  create(data: IImageData): Promise<ImageType> {
    return this.imageDataSource.create(data);
  }

  findAll(criteria: Partial<ImageType>, pagination?: Pagination) {
    return this.imageDataSource.findAll(criteria, pagination ?? { skip: 0, limit: 100 });
  }

  delete(id: string | string[]) {
    return this.imageDataSource.delete(id);
  }

  updateOne(id: string, data: Partial<IImageData>) {
    return this.imageDataSource.updateOne(id, data);
  }
}
