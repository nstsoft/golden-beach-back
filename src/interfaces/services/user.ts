import { User } from 'entities';
import { IUserData } from 'interfaces';
import { Login } from 'types';

import { IService } from './common';
export interface IUserService extends IService<User, IUserData> {
  login(data: Login): Promise<{ user: User; accessToken: string; refreshToken: string }>;
}
