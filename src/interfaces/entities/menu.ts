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
  images: { thumb: string; image: string }[];
}

export interface IRawMenu extends IMenuData {
  _id?: ObjectId;
}
