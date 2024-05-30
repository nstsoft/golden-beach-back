import { Deleted, Pagination } from 'types';

export interface IService<T, C> {
  findById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findAll(criteria: Partial<T>, pagination?: Pagination): Promise<{ data: T[]; count: number }>;
  delete(id: string): Promise<Deleted>;
}
