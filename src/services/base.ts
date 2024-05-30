import { IEventDataSource, IEventService, IRawEvent } from 'interfaces';
import { EventType, Pagination } from 'types';

export class BaseService implements IEventService {
  constructor(private eventDataSource: IEventDataSource) {}

  findById(id: string) {
    return this.eventDataSource.findOneById(id);
  }

  create(data: IRawEvent) {
    return this.eventDataSource.create(data);
  }

  findAll(criteria: Partial<EventType>, pagination?: Pagination) {
    return this.eventDataSource.findAll(criteria, pagination ?? { skip: 0, limit: 20 });
  }

  delete(id: string) {
    return this.eventDataSource.delete(id);
  }
}
