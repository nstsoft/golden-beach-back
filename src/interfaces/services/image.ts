import { IImageData } from 'interfaces/entities';
import { File, ImageType, Metadata } from 'types';

import { IService } from './common';

export interface IImageService extends IService<ImageType, IImageData> {
  sharpImage(file: Buffer): Promise<Buffer>;
  uploadImage(file: Buffer, metadata: Metadata, folder?: string): Promise<unknown>;
  getMetadata(file: File, isThumb?: boolean): Metadata;
}
