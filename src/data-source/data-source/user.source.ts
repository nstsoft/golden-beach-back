import { User } from 'entities';
import { IUserData, IUserDataSource } from 'interfaces';

import { UserModel } from '../models';
import { BaseDataSource } from './base.source';

export class UserDataSource extends BaseDataSource<UserModel, User, IUserData> implements IUserDataSource {
  constructor() {
    super(UserModel, User);
  }
}
