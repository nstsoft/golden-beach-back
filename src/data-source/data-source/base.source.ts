import { Event, Image, Menu, User } from 'entities';
import { IEventData, IImageData, IMenuData, IUserData } from 'interfaces';
import { ObjectId } from 'mongodb';
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, MongoRepository } from 'typeorm';
import { Pagination } from 'types';
import { deepParseObjectId, removeUndefinedProps } from 'utils';

import { EventModel, ImagesModel, MenuModel, UserModel } from '../models';
import { MongoSource } from '../source';

type EntityData = IUserData | IImageData | IEventData | IMenuData;
type Domains = User | Image | Event | Menu;
type Models = EventModel | UserModel | ImagesModel | MenuModel;

export class BaseDataSource<M extends Models, Domain extends Domains, Data extends EntityData> {
  repository: MongoRepository<M>;
  domain: { toDomain: (model: M) => Domain; toBatchDomain: (model: M[]) => Domain[] };
  model: new (...args: unknown[]) => M;

  constructor(model: new (...args: unknown[]) => M, domain: new (...args: unknown[]) => Domain) {
    this.repository = MongoSource.getMongoRepository(model);
    this.domain = domain as unknown as { toDomain: (model: M) => Domain; toBatchDomain: (model: M[]) => Domain[] };
    this.model = model;
  }

  async create(data: Data) {
    const created = new this.model(data);
    const saved = await this.repository.save(created);
    return this.domain.toDomain(saved);
  }

  async delete(id: string | string[]) {
    return this.repository.delete(id);
  }

  async findAll(criteria: Partial<Data>, pagination?: Pagination) {
    const plain = deepParseObjectId(removeUndefinedProps(criteria));

    const params: FindManyOptions<new (...data: unknown[]) => M> = Object.keys(plain).length ? { where: plain } : {};

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

  async updateOne(_id: string, data: Partial<Data>) {
    const { _id: id, ...parsed } = new this.model(data).toPlain();

    return this.repository.update(_id, parsed);
  }
}
