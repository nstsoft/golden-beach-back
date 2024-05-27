import { Event } from 'entities';
import { IEventData } from 'interfaces';

import { IService } from './common';
export interface IEventService extends IService<Event, IEventData> {}
