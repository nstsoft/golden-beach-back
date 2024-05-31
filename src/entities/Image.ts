import { ImageTypeEnum, IRawImage } from 'interfaces';
import { ObjectId } from 'typeorm';

import { Base } from './Base';

export class Image extends Base {
  image: string;
  thumb: string;
  type: ImageTypeEnum;
  label: string;
  _id?: ObjectId;

  constructor({ image, type, thumb, _id, label }: IRawImage) {
    super();
    this.type = type;
    this.image = image;
    this.thumb = thumb;
    this.label = label;
    this._id = _id;
  }
}
