import { IRawMenu } from 'interfaces';
import { ObjectId } from 'mongodb';

import { Base } from './Base';

export class Menu extends Base {
  image: string;
  name: string;
  price: string;
  labels: string[];
  description: string;
  type: string;
  _id?: ObjectId;

  constructor(menuItem: IRawMenu) {
    super();
    this.image = menuItem.image;
    this.name = menuItem.name;
    this.price = menuItem.price;
    this.labels = menuItem.labels;
    this.description = menuItem.description;
    this.type = menuItem.type;
  }
}
