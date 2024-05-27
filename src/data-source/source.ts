import { DataSource } from 'typeorm';

import { EventModel, UserModel } from './models';

const url = process.env.MONGO_DB_URL.replace('{user}', process.env.DB_USERNAME)
  .replace('{password}', process.env.DB_PASSWORD)
  .replace('{database}', process.env.DB_NAME);

console.log(url);

export const MongoSource = new DataSource({
  url,
  type: 'mongodb',
  synchronize: true,
  logging: false,
  entities: [UserModel, EventModel],
});
