import { ObjectId } from 'typeorm';

export enum EventTypeEnum {
  news = 'news',
  event = 'event',
}

export interface IEventData {
  image: string;
  thumb: string;
  date: Date;
  name: string;
  descriptionEng: string;
  descriptionIt: string;
  type: EventTypeEnum;
}

export interface IRawEvent extends IEventData {
  _id?: ObjectId;
}
