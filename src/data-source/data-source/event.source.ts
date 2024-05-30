import { Event } from 'entities';
import { IEventData, IEventDataSource } from 'interfaces';
import { Repository } from 'typeorm';

import { EventModel } from '../models';
import { BaseDataSource } from './base.source';

export class EventDataSource extends BaseDataSource<EventModel, Event, IEventData> implements IEventDataSource {
  private eventRepository: Repository<EventModel>;

  constructor() {
    super(EventModel, Event);
  }
}
