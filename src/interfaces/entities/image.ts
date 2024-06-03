import { ObjectId } from 'typeorm';

export enum ImageTypeEnum {
  beach = 'beach',
  restaurant = 'restaurant',
  club = 'club',
}

export interface IImageData {
  image: string;
  thumb: string;
  album: string;
  type: ImageTypeEnum;
}

export interface IRawImage extends IImageData {
  _id?: ObjectId;
}
