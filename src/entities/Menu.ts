import { IRawMenu } from 'interfaces';
import { ObjectId } from 'mongodb';

import { Base } from './Base';

export class Menu extends Base {
  image: string;
  thumb: string;
  name: string;
  price: string;
  labels: string[];
  descriptionIt: string;
  descriptionEn: string;
  category: string;
  _id?: ObjectId;

  constructor(menuItem: IRawMenu) {
    super();
    this.image = menuItem.image;
    this.thumb = menuItem.thumb;
    this.name = menuItem.name;
    this.price = menuItem.price;
    this.labels = menuItem.labels;
    this.descriptionIt = menuItem.descriptionIt;
    this.descriptionEn = menuItem.descriptionEn;
    this.category = menuItem.category;
  }
}
