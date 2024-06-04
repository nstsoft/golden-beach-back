import { Expose, plainToInstance } from 'class-transformer';
import { IMenuData } from 'interfaces';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { removeUndefinedProps } from 'utils';

@Entity('menu')
export class MenuModel {
  @Expose()
  @ObjectIdColumn()
  _id: ObjectId;
  @Expose()
  @Column({ unique: false, type: 'text' })
  image: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  thumb: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  name: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  price: string;
  @Expose()
  @Column({ unique: false, type: 'text', array: true })
  labels: string[];
  @Expose()
  @Column({ unique: false, type: 'text' })
  descriptionEn: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  descriptionIt: string;
  @Expose()
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

  @BeforeInsert()
  @BeforeUpdate()
  transformAndValidate() {
    const transformed = plainToInstance(MenuModel, this, { excludeExtraneousValues: true });
    Object.assign(this, transformed);
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
