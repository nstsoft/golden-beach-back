import { User } from 'entities';
import { IUserData } from 'interfaces';

import { IService } from './common';
export interface IUserService extends IService<User, IUserData> {}
