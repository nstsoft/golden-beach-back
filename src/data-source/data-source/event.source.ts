import { Event } from 'entities';
import { IEventData, IEventDataSource } from 'interfaces';
import { FindManyOptions, FindOptionsOrder, Repository } from 'typeorm';
import { Pagination } from 'types';
import { removeUndefinedProps } from 'utils';

import { EventModel } from '../models';
import { BaseDataSource } from './base.source';

export class EventDataSource extends BaseDataSource<EventModel, Event, IEventData> implements IEventDataSource {
  private eventRepository: Repository<EventModel>;

  async findAll(criteria: Partial<IEventData>, pagination?: Pagination) {
    let params: FindManyOptions<new (...data: unknown[]) => EventModel> = Object.keys(criteria).length
      ? { where: criteria }
      : {};

    params = removeUndefinedProps(params);

    const order: FindOptionsOrder<EventModel> = { date: 'DESC' };

    if (criteria.date) {
      Object.assign(params.where, { date: { $gte: criteria.date } });
    }

    const [data, count] = await this.repository.findAndCount({
      ...params,
      order,
      take: pagination.limit,
      skip: pagination.skip,
    });

    return {
      count,
      data: this.domain.toBatchDomain(data),
    };
  }

  constructor() {
    super(EventModel, Event);
  }
}
