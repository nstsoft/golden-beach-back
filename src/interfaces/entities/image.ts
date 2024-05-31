import { ObjectId } from 'typeorm';

export enum ImageTypeEnum {
  beach = 'beach',
  restaurant = 'restaurant',
  club = 'club',
}

export interface IImageData {
  image: string;
  thumb: string;
  label: string;
  type: ImageTypeEnum;
}

export interface IRawImage extends IImageData {
  _id?: ObjectId;
}
