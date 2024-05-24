import { User } from '../entities';
import { IUserDataSource, IUserService } from '../interfaces';

export class UserService implements IUserService {
  constructor(private userDataSource: IUserDataSource) {}

  findById(id: string) {
    return this.userDataSource.findOneById(id);
  }

  create(data: User): Promise<User> {
    return this.userDataSource.create(data);
  }
}
