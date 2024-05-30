import { IMenuData } from 'interfaces';
import { MenuType } from 'types';

import { IService } from './common';
export interface IMenuService extends IService<MenuType, IMenuData> {}
