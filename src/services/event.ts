import { IEventDataSource, IEventService, IRawEvent } from 'interfaces';
import { EventType } from 'types';

export class EventService implements IEventService {
  constructor(private eventDataSource: IEventDataSource) {}

  findById(id: string) {
    return this.eventDataSource.findOneById(id);
  }

  create(data: IRawEvent) {
    return this.eventDataSource.create(data);
  }

  findAll(criteria: Partial<EventType>) {
    return this.eventDataSource.findAll(criteria);
  }
}
