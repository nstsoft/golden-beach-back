import { IImageData } from 'interfaces/entities';
import { ObjectId } from 'typeorm';
import { File, ImageType, Metadata } from 'types';

import { IService } from './common';

export interface IImageService extends IService<ImageType, IImageData> {
  sharpImage(file: Buffer, quality?: number): Promise<Buffer>;
  sharpAndCropImage(
    file: Buffer,
    { width, height, quality }: { width: number; height: number; quality?: number },
  ): Promise<Buffer>;
  uploadImage(file: Buffer, metadata: Metadata, folder?: string): Promise<unknown>;
  getMetadata(file: File, isThumb?: boolean): Metadata;
  getMetadata(file: File, isThumb?: boolean): Metadata;
  getAlbums(): Promise<{ _id: ObjectId; count: number; image: IImageData }[]>;
}
