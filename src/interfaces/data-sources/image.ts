import { Metadata } from 'types';

export interface IImageDataSource {
  uploadImage(file: Buffer, metadata: Metadata, folder?: string): Promise<unknown>;
}
