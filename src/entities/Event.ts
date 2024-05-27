import { EventType, IEvent, IRawEvent } from 'interfaces';
import { ObjectId } from 'typeorm';

export class Event implements IEvent {
  image: string;
  thumb: string;
  date: Date;
  name: string;
  descriptionEng: string;
  descriptionIt: string;
  type: EventType;
  _id?: ObjectId;

  constructor({ image, date, name, descriptionEng, descriptionIt, type, thumb }: IRawEvent) {
    this.type = type;
    this.image = image;
    this.date = date;
    this.name = name;
    this.descriptionEng = descriptionEng;
    this.descriptionIt = descriptionIt;
    this.thumb = thumb;
  }

  static toDomain(user: IRawEvent): IEvent {
    return new Event(user);
  }

  static toBatchDomain(events: IRawEvent[]): IEvent[] {
    return events.map((event) => Event.toDomain(event));
  }

  toJson(): IRawEvent {
    return {
      name: this.name,
      descriptionIt: this.descriptionIt,
      descriptionEng: this.descriptionIt,
      image: this.image,
      date: this.date,
      type: this.type,
      _id: this._id,
    };
  }

  toRaw() {
    return this.toJson();
  }

  toJSON() {
    return this.toJson();
  }
}
