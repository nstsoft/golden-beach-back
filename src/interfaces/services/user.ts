import { IUserData } from 'interfaces';
import { Login, UserType } from 'types';

import { IService } from './common';
export interface IUserService extends IService<UserType, IUserData> {
  login(data: Login): Promise<{ user: UserType; accessToken: string; refreshToken: string }>;
}
