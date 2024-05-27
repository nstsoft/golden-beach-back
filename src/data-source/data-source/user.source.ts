import { User } from 'entities';
import { IEventData, IRawUser, IUserData, IUserDataSource } from 'interfaces';
import { ObjectId, Repository } from 'typeorm';

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
    const user = new UserModel();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;
    user.role = data.role;
    const saved = await this.userRepository.save(user);
    return User.toDomain(saved);
  }

  async findOne(criteris: Partial<User>) {
    const user = await this.userRepository.findOneByOrFail(criteris);
    return User.toDomain(user);
  }

  async findAll(criteria: Partial<IEventData>) {
    const [data, count] = await Promise.all([
      this.userRepository.find({ where: criteria }),
      this.userRepository.count({ where: criteria }),
    ]);

    return {
      count,
      data: User.toBatchDomain(data),
    };
  }
}
