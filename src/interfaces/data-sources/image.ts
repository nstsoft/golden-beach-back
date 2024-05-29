import { IImageData } from 'interfaces';
import { ImageType, Metadata } from 'types';

import { IDataSource } from './common';

export interface IImageDataSource extends IDataSource<ImageType, IImageData> {
  uploadImage(file: Buffer, metadata: Metadata, folder?: string): Promise<unknown>;
}
