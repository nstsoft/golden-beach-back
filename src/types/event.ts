import { EventTypeEnum, IRawEvent } from 'interfaces';

import { BaseEntity } from './entity';

export type EventType = BaseEntity<IRawEvent>;
export type UploadEvent = {
  date: Date;
  name: string;
  descriptionEng: string;
  descriptionIt: string;
  type: EventTypeEnum;
};
