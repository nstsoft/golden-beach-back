import { User } from 'entities';
import { IEventData, IRawUser, IUserData, IUserDataSource } from 'interfaces';
import { FindManyOptions, ObjectId, Repository } from 'typeorm';

import { UserModel } from '../models';
import { MongoSource } from '../source';

export class UserDataSource implements IUserDataSource {
  private userRepository: Repository<UserModel>;

  constructor() {
    this.userRepository = MongoSource.getRepository(UserModel);
  }

  async findOneById(id: string) {
    const data: IRawUser = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    return data && User.toDomain(data);
  }

  async create(data: IUserData) {
    const user = new UserModel(data);
    const saved = await this.userRepository.save(user);
    return User.toDomain(saved);
  }

  async findOne(criteria: Partial<User>) {
    const user = await this.userRepository.findOneByOrFail(criteria);
    return User.toDomain(user);
  }

  async findAll(criteria: Partial<IEventData>) {
    const params: FindManyOptions<UserModel> = Object.keys(criteria).length ? { where: criteria } : {};
    const [data, count] = await Promise.all([this.userRepository.find(params), this.userRepository.count(params)]);

    return {
      count,
      data: User.toBatchDomain(data),
    };
  }
}
