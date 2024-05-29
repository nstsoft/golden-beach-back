import { Event } from 'entities';
import { IEventData, IEventDataSource, IRawEvent } from 'interfaces';
import { FindManyOptions, ObjectId, Repository } from 'typeorm';

import { EventModel } from '../models';
import { MongoSource } from '../source';

export class EventDataSource implements IEventDataSource {
  private eventRepository: Repository<EventModel>;

  constructor() {
    this.eventRepository = MongoSource.getRepository(EventModel);
  }

  async findOneById(id: string) {
    const data: IRawEvent = await this.eventRepository.findOneBy({ _id: new ObjectId(id) });
    return data && Event.toDomain(data);
  }

  async create(data: IEventData) {
    const event = new EventModel(data);

    const saved = await this.eventRepository.save(event);

    return Event.toDomain(saved);
  }

  async findOne(criteria: Partial<IEventData>) {
    const event = await this.eventRepository.findOneByOrFail(criteria);
    return Event.toDomain(event);
  }

  async findAll(criteria: Partial<IEventData>) {
    const params: FindManyOptions<EventModel> = Object.keys(criteria).length ? { where: criteria } : {};
    const [data, count] = await Promise.all([this.eventRepository.find(params), this.eventRepository.count(params)]);

    return {
      count,
      data: Event.toBatchDomain(data),
    };
  }
}
