import { EventTypeEnum, IEventData } from 'interfaces';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('event')
export class EventModel {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: false, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  descriptionIt: string;
  @Column({ unique: false, type: 'text' })
  descriptionEng: string;
  @Column({ unique: false, type: 'text' })
  image: string;
  @Column({ unique: false, type: 'text' })
  thumb: string;
  @Column({ unique: false, type: 'datetime' })
  date: Date;
  @Column({ type: 'enum', enum: EventTypeEnum, default: EventTypeEnum.event, array: false })
  type: EventTypeEnum;

  constructor(event?: IEventData) {
    this.date = event?.date;
    this.name = event?.name;
    this.descriptionIt = event?.descriptionIt;
    this.descriptionEng = event?.descriptionEng;
    this.image = event?.image;
    this.thumb = event?.thumb;
    this.type = event?.type;
  }
}
