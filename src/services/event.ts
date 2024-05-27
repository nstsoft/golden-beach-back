import { Event } from 'entities';
import { IEventDataSource, IEventService, IRawEvent } from 'interfaces';

export class EventService implements IEventService {
  constructor(private eventDataSource: IEventDataSource) {}

  findById(id: string) {
    return this.eventDataSource.findOneById(id);
  }

  create(data: IRawEvent): Promise<Event> {
    return this.eventDataSource.create(data);
  }
}
