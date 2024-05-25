import 'dotenv/config';

const MONGO_DB_URL: string = process.env.MONGO_DB_URL ?? '';
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? '';
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? '';
const DB_USERNAME: string = process.env.DB_USERNAME ?? '';
const DB_PASSWORD: string = process.env.DB_PASSWORD ?? '';
const DB_NAME: string = process.env.DB_NAME ?? '';
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const BCRYPT_SALT: number = process.env.BCRYPT_SALT ? +process.env.BCRYPT_SALT : 10;

export {
  ACCESS_TOKEN_SECRET,
  BCRYPT_SALT,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  MONGO_DB_URL,
  PORT,
  REFRESH_TOKEN_SECRET,
};
