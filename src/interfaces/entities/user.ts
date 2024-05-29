import { ObjectId } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IRawUser extends IUserData {
  _id?: ObjectId;
}
