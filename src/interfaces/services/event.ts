import { IEventData } from 'interfaces';
import { EventType } from 'types';

import { IService } from './common';
export interface IEventService extends IService<EventType, IEventData> {}
