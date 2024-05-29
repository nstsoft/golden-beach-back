export class Base {
  constructor(data?: unknown) {
    if (data) {
      Object.assign(this, data);
    }
  }

  toObject() {
    return this.properties() as this;
  }

  toJson() {
    return JSON.stringify(this.properties());
  }

  toRaw() {
    return this.toObject();
  }

  properties(): Record<string, unknown> {
    const ownProperties: Record<string, unknown> = {};
    for (const key of Object.keys(this)) {
      ownProperties[key] = (this as unknown)[key];
    }
    return ownProperties;
  }

  static toDomain<T extends typeof Base>(this: T, data?: Partial<InstanceType<T>>) {
    return new this(data) as InstanceType<T>;
  }

  static toBatchDomain<T extends typeof Base>(this: T, data: Partial<InstanceType<T>>[]) {
    return data.map((item) => Base.toDomain(item)) as InstanceType<T>[];
  }
}
