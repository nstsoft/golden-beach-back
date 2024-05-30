import { Menu } from 'entities';
import { IMenuData } from 'interfaces';

import { MenuModel } from '../models';
import { BaseDataSource } from './base.source';

export class MenuDataSource extends BaseDataSource<MenuModel, Menu, IMenuData> {
  constructor() {
    super(MenuModel, Menu);
  }
}
