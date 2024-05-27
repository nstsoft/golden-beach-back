import { File, Metadata } from 'types';

export interface IImageService {
  sharpImage(file: Buffer): Promise<Buffer>;
  uploadImage(file: Buffer, metadata: Metadata, folder?: string): Promise<unknown>;
  getMetadata(file: File, isThumb?: boolean): Metadata;
}
