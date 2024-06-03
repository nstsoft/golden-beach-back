import { IRawMenu } from 'interfaces';

import { BaseEntity } from './entity';

export type MenuType = BaseEntity<IRawMenu>;

export type UploadMenu = {
  name: string;
  price: string;
  labels: string;
  descriptionEn: string;
  descriptionIt: string;
  category: string;
};
