import bcryptjs from 'bcryptjs';
import { UserRole } from 'interfaces';
import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

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
    this.password = await bcryptjs.hash(this.password, 10);
  }
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER, array: false })
  role: UserRole;
}
