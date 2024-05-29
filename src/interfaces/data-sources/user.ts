import { IUserData } from 'interfaces';
import { UserType } from 'types';

import { IDataSource } from './common';

export interface IUserDataSource extends IDataSource<UserType, IUserData> {}
