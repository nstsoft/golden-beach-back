import { IImageData, ImageTypeEnum } from 'interfaces';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('image')
export class ImagesModel {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: true, type: 'text' })
  image: string;
  @Column({ unique: false, type: 'text' })
  thumb: string;
  @Column({ type: 'enum', enum: ImageTypeEnum, default: ImageTypeEnum.beach, array: false })
  type: ImageTypeEnum;

  constructor(image?: IImageData) {
    this.image = image?.image;
    this.thumb = image?.thumb;
    this.type = image?.type;
  }
}
