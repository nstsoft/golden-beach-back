import { IMenuDataSource, IMenuService, IRawMenu } from 'interfaces';
import { Pagination } from 'types';

export class MenuService implements IMenuService {
  constructor(private menuDataSource: IMenuDataSource) {}

  findById(id: string) {
    return this.menuDataSource.findOneById(id);
  }

  create(data: IRawMenu) {
    return this.menuDataSource.create(data);
  }

  findAll(criteria: Partial<IRawMenu>, pagination?: Pagination) {
    return this.menuDataSource.findAll(criteria, pagination ?? { skip: 0, limit: 20 });
  }

  delete(id: string) {
    return this.menuDataSource.delete(id);
  }
}
