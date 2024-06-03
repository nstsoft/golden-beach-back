import { ObjectId } from 'typeorm';

export interface IMenuData {
  image: string;
  thumb: string;
  name: string;
  price: string;
  labels: string[];
  descriptionEn: string;
  descriptionIt: string;
  category: string;
}

export interface IRawMenu extends IMenuData {
  _id?: ObjectId;
}
