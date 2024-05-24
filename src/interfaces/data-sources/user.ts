import { User } from 'entities';
import { IUserData } from 'interfaces';

import { IDataSource } from './common';

export interface IUserDataSource extends IDataSource<User, IUserData> {}
