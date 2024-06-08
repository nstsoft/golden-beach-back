import { IImageData } from 'interfaces';
import { ObjectId } from 'typeorm';
import { type AlbumsQuery, ImageType, Metadata } from 'types';

import { IDataSource } from './common';

export interface IImageDataSource extends IDataSource<ImageType, IImageData> {
  uploadImage(file: Buffer, metadata: Metadata, folder?: string): Promise<unknown>;
  getAlbums(query: AlbumsQuery): Promise<{ _id: ObjectId; count: number; image: IImageData }[]>;
}
