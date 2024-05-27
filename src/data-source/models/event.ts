import { EventType } from 'interfaces';
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
  @Column({ type: 'enum', enum: EventType, default: EventType.event, array: false })
  type: EventType;
}
