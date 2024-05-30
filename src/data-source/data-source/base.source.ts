import { Event, Image, Menu, User } from 'entities';
import { IEventData, IImageData, IMenuData, IUserData } from 'interfaces';
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, ObjectId, Repository } from 'typeorm';
import { Pagination } from 'types';

import { EventModel, ImagesModel, MenuModel, UserModel } from '../models';
import { MongoSource } from '../source';

type EntityData = IUserData | IImageData | IEventData | IMenuData;
type Domains = User | Image | Event | Menu;
type Models = EventModel | UserModel | ImagesModel | MenuModel;

export class BaseDataSource<M extends Models, Domain extends Domains, Data extends EntityData> {
  repository: Repository<M>;
  domain: { toDomain: (model: M) => Domain; toBatchDomain: (model: M[]) => Domain[] };
  model: new (...args: unknown[]) => M;

  constructor(model: new (...args: unknown[]) => M, domain: new (...args: unknown[]) => Domain) {
    this.repository = MongoSource.getRepository(model);
    this.domain = domain as unknown as { toDomain: (model: M) => Domain; toBatchDomain: (model: M[]) => Domain[] };
    this.model = model;
  }

  async create(data: Data) {
    const created = new this.model(data);
    const saved = await this.repository.save(created);
    return this.domain.toDomain(saved);
  }

  async delete(id: string) {
    return this.repository.delete(new ObjectId(id));
  }

  async findAll(criteria: Partial<Data>, pagination?: Pagination) {
    const params: FindManyOptions<new (...data: unknown[]) => M> = Object.keys(criteria).length
      ? { where: criteria }
      : {};

    const order: FindOptionsOrder<new (...data: unknown[]) => M> = { _id: 'DESC' };

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

  async findOneById(id: string) {
    const query: FindOptionsWhere<new (...args: unknown[]) => M> = { _id: new ObjectId(id) };
    const data = await this.repository.findOneBy(query);
    return data && this.domain.toDomain(data);
  }

  async findOne(criteria: FindOptionsWhere<new (...args: unknown[]) => M>) {
    const event = await this.repository.findOneByOrFail(criteria);
    return this.domain.toDomain(event);
  }
}
