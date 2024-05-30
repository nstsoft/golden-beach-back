import { IMenuData } from 'interfaces';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('menu')
export class MenuModel {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: true, type: 'text' })
  image: string;
  @Column({ unique: true, type: 'text' })
  name: string;
  @Column({ unique: true, type: 'text' })
  price: string;
  @Column({ unique: true, type: 'text', array: true })
  labels: string[];
  @Column({ unique: true, type: 'text' })
  description: string;
  @Column({ unique: true, type: 'text' })
  type: string;

  constructor(menu?: IMenuData) {
    this.description = menu?.description;
    this.image = menu?.image;
    this.labels = menu?.labels;
    this.name = menu?.name;
    this.price = menu?.price;
    this.type = menu?.type;
  }
}
