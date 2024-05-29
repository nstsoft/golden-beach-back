export interface IDataSource<T, C> {
  findOneById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findOne(criteria: Partial<T>): Promise<T>;
  findAll(criteria: Partial<C>): Promise<{ count: number; data: T[] }>;
}
