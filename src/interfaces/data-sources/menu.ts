import { Menu } from 'entities';
import { IMenuData } from 'interfaces';

import { IDataSource } from './common';

export interface IMenuDataSource extends IDataSource<Menu, IMenuData> {}
