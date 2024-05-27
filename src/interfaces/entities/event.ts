import { ObjectId } from 'typeorm';

export enum EventType {
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
  type: EventType;
}

export interface IRawEvent extends IEventData {
  _id?: ObjectId;
}

export interface IEvent extends IRawEvent {
  toRaw(): IRawEvent;
  toJSON(): IRawEvent;
  toJson(): IRawEvent;
}
