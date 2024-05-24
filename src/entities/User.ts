import { IRawUser, IUser, UserRole } from 'interfaces';
import { ObjectId } from 'typeorm';

export class User implements IUser {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  _id?: ObjectId;

  constructor({ email, password, role, _id, name }: IRawUser) {
    this.email = email;
    this.email = email;
    this.password = password;
    this.role = role;
    this._id = _id;
    this.name = name;
  }

  static toDomain(user: IRawUser): IUser {
    return new User(user);
  }

  static toBatchDomain(users: IRawUser[]): IUser[] {
    return users.map((user) => User.toDomain(user));
  }

  toRaw(): IRawUser {
    return {
      email: this.email,
      name: this.name,
      password: '*****',
      role: this.role,
      _id: this._id,
    };
  }

  toJSON(): IRawUser {
    return {
      email: this.email,
      name: this.name,
      password: '*****',
      role: this.role,
      _id: this._id,
    };
  }
}
