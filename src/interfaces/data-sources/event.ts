import { Event } from 'entities';
import { IEventData } from 'interfaces';

import { IDataSource } from './common';

export interface IEventDataSource extends IDataSource<Event, IEventData> {}
