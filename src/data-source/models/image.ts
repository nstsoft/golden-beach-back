import { Expose, plainToInstance } from 'class-transformer';
import { IImageData, ImageTypeEnum } from 'interfaces';
import { ObjectId as ObjectID } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { removeUndefinedProps } from 'utils';

@Entity('image')
export class ImagesModel {
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
  album: string;
  @Expose()
  @Column({ type: 'enum', enum: ImageTypeEnum, default: ImageTypeEnum.beach, array: false })
  type: ImageTypeEnum;
  @Expose()
  @Column({ type: 'text' })
  event: ObjectId;

  constructor(image?: IImageData) {
    this.image = image?.image;
    this.thumb = image?.thumb;
    this.type = image?.type;
    this.album = image?.album;
    this.event = image?.event && new ObjectID(image?.event);
  }

  @BeforeInsert()
  @BeforeUpdate()
  transformAndValidate() {
    const transformed = plainToInstance(ImagesModel, this, { excludeExtraneousValues: true });
    Object.assign(this, transformed);
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
