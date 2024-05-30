export interface BaseEntity<T> {
  toObject(): Omit<T, 'toObject' | 'toJson' | 'toRaw' | 'properties'>;

  toJson(): string;

  toRaw(): Omit<T, 'toObject' | 'toJson' | 'toRaw' | 'properties'>;

  properties(): Omit<T, 'toObject' | 'toJson' | 'toRaw' | 'properties'>;

  toDomain(data?: Partial<T>): this;

  toBatchDomain(data?: Partial<T>[]): this[];
}
