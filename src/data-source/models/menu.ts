import { IMenuData } from 'interfaces';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('menu')
export class MenuModel {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: false, type: 'text' })
  image: string;
  @Column({ unique: false, type: 'text' })
  thumb: string;
  @Column({ unique: false, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  price: string;
  @Column({ unique: false, type: 'text', array: true })
  labels: string[];
  @Column({ unique: false, type: 'text' })
  descriptionEn: string;
  @Column({ unique: false, type: 'text' })
  descriptionIt: string;
  @Column({ unique: false, type: 'text' })
  category: string;

  constructor(menu?: IMenuData) {
    this.descriptionEn = menu?.descriptionEn;
    this.descriptionIt = menu?.descriptionIt;
    this.image = menu?.image;
    this.labels = menu?.labels;
    this.name = menu?.name;
    this.price = menu?.price;
    this.category = menu?.category;
    this.thumb = menu?.thumb;
  }
}
