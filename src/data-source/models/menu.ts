import { Expose, plainToInstance } from 'class-transformer';
import { IMenuData } from 'interfaces';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { removeUndefinedProps } from 'utils';

class Image {
  @Column({ unique: false, type: 'text' })
  thumb: string;
  @Column({ unique: false, type: 'text' })
  image: string;
}

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
  @Expose()
  @Column(() => Image, { array: true })
  images: Image[];

  constructor(menu?: IMenuData) {
    this.descriptionEn = menu?.descriptionEn;
    this.descriptionIt = menu?.descriptionIt;
    this.image = menu?.image;
    this.labels = menu?.labels;
    this.name = menu?.name;
    this.price = menu?.price;
    this.category = menu?.category;
    this.thumb = menu?.thumb;
    this.images = menu?.images;
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
