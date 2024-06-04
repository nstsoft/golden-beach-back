import bcryptjs from 'bcryptjs';
import { BCRYPT_SALT } from 'config';
import { IUserData, UserRole } from 'interfaces';
import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { removeUndefinedProps } from 'utils';

@Entity('user')
export class UserModel {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: true, type: 'text' })
  email: string;
  @Column({ unique: false, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, BCRYPT_SALT);
  }
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER, array: false })
  role: UserRole;

  constructor(user?: IUserData) {
    this.email = user?.email;
    this.name = user?.name;
    this.password = user?.password;
    this.role = user?.role;
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
