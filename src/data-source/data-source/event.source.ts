import { Event } from 'entities';
import { IEventData, IEventDataSource, IRawEvent } from 'interfaces';
import { ObjectId, Repository } from 'typeorm';

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
    const event = new EventModel();
    event.name = data.name;
    event.descriptionIt = data.descriptionIt;
    event.descriptionEng = data.descriptionEng;
    event.image = data.image;
    event.thumb = data.thumb;
    event.date = data.date;
    event.type = data.type;

    const saved = await this.eventRepository.save(event);

    return Event.toDomain(saved);
  }

  async findOne(criteris: Partial<IEventData>) {
    const event = await this.eventRepository.findOneByOrFail(criteris);
    return Event.toDomain(event);
  }

  async findAll(criteria: Partial<IEventData>) {
    const [data, count] = await Promise.all([
      this.eventRepository.find({ where: criteria }),
      this.eventRepository.count({ where: criteria }),
    ]);

    return {
      count,
      data: Event.toBatchDomain(data),
    };
  }
}
