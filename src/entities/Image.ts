import { ImageTypeEnum, IRawImage } from 'interfaces';
import { ObjectId } from 'typeorm';

import { Base } from './Base';

export class Image extends Base {
  image: string;
  thumb: string;
  type: ImageTypeEnum;
  album: string;
  event?: string;
  _id?: ObjectId;

  constructor({ image, type, thumb, _id, album, event }: IRawImage) {
    super();
    this.type = type;
    this.image = image;
    this.thumb = thumb;
    this.album = album;
    this.event = event;
    this._id = _id;
  }
}
