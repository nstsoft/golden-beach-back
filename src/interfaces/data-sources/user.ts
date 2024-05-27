import { IUser, IUserData } from 'interfaces';

import { IDataSource } from './common';

export interface IUserDataSource extends IDataSource<IUser, IUserData> {}
