export interface IDataSource<T, C> {
  findOneById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findOne(criteris: Partial<T>): Promise<T>;
}
