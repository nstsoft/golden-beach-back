import { EventTypeEnum, IRawEvent } from 'interfaces';
import { ObjectId } from 'typeorm';

import { Base } from './Base';

export class Event extends Base {
  image: string;
  thumb: string;
  date: Date;
  name: string;
  descriptionEng: string;
  descriptionIt: string;
  type: EventTypeEnum;
  _id?: ObjectId;

  constructor({ image, date, name, descriptionEng, descriptionIt, type, thumb }: IRawEvent) {
    super();
    this.type = type;
    this.image = image;
    this.date = date;
    this.name = name;
    this.descriptionEng = descriptionEng;
    this.descriptionIt = descriptionIt;
    this.thumb = thumb;
  }
}
