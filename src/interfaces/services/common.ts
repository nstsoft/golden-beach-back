export interface IService<T, C> {
  findById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
}
