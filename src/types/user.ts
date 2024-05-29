import { IRawUser } from 'interfaces';

import { BaseEntity } from './entity';

export type Login = {
  email: string;
  password: string;
};

export type UserType = BaseEntity<IRawUser> & {
  comparePassword(password: string): Promise<boolean>;
};
