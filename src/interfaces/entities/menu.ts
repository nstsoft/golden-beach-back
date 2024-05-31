import { ObjectId } from 'typeorm';

export interface IMenuData {
  image: string;
  thumb: string;
  name: string;
  price: string;
  labels: string[];
  description: string;
  type: string;
}

export interface IRawMenu extends IMenuData {
  _id?: ObjectId;
}
