import bcryptjs from 'bcryptjs';
import { IRawUser, UserRole } from 'interfaces';
import { ObjectId } from 'typeorm';

import { Base } from './Base';

export class User extends Base {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  _id?: ObjectId;

  constructor({ email, password, role, _id, name }: IRawUser) {
    super();
    this.email = email;
    this.email = email;
    this.password = password;
    this.role = role;
    this._id = _id;
    this.name = name;
  }

  comparePassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  toJson() {
    return JSON.stringify({
      email: this.email,
      name: this.name,
      password: '*****',
      role: this.role,
      _id: this._id,
    });
  }
}
