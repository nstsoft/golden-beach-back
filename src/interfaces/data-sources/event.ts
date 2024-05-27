import { IEvent, IEventData } from 'interfaces';

import { IDataSource } from './common';

export interface IEventDataSource extends IDataSource<IEvent, IEventData> {}
