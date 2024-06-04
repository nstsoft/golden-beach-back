import { ImageTypeEnum, IRawImage } from 'interfaces';

import { BaseEntity } from './entity';

export type ImageType = BaseEntity<IRawImage>;

export type UploadImage = {
  type: ImageTypeEnum;
  album: string;
  event?: string;
};
