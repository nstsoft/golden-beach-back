import { ObjectId } from 'typeorm';

export enum ImageTypeEnum {
  beach = 'news',
  restaurant = 'restaurant',
  club = 'club',
}

export interface IImageData {
  image: string;
  thumb: string;
  type: ImageTypeEnum;
}

export interface IRawImage extends IImageData {
  _id?: ObjectId;
}
