import { IEventData } from 'interfaces';
import { EventType } from 'types';

import { IDataSource } from './common';

export interface IEventDataSource extends IDataSource<EventType, IEventData> {}
