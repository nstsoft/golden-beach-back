import { Expose, plainToInstance } from 'class-transformer';
import { EventTypeEnum, IEventData } from 'interfaces';
import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { removeUndefinedProps } from 'utils';

@Entity('event')
export class EventModel {
  @Expose()
  @ObjectIdColumn()
  _id: ObjectId;
  @Expose()
  @Column({ unique: false, type: 'text' })
  name: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  descriptionIt: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  descriptionEng: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  image: string;
  @Expose()
  @Column({ unique: false, type: 'text' })
  thumb: string;
  @Expose()
  @Column({ unique: false, type: 'datetime' })
  date: Date;
  @Expose()
  @Column({ type: 'enum', enum: EventTypeEnum, default: EventTypeEnum.event, array: false })
  type: EventTypeEnum;

  constructor(event?: IEventData) {
    this.name = event?.name;
    this.descriptionIt = event?.descriptionIt;
    this.descriptionEng = event?.descriptionEng;
    this.image = event?.image;
    this.thumb = event?.thumb;
    this.type = event?.type;
    if (event?.date) {
      this.date = moment(event.date).utc().toDate();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  transformAndValidate() {
    const transformed = plainToInstance(EventModel, this, { excludeExtraneousValues: true });
    Object.assign(this, transformed);
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
