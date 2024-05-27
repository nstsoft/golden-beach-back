import 'dotenv/config';

const MONGO_DB_URL: string = process.env.MONGO_DB_URL ?? '';
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? '';
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? '';
const DB_USERNAME: string = process.env.DB_USERNAME ?? '';
const DB_PASSWORD: string = process.env.DB_PASSWORD ?? '';
const DB_NAME: string = process.env.DB_NAME ?? '';
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const BCRYPT_SALT: number = process.env.BCRYPT_SALT ? +process.env.BCRYPT_SALT : 10;
const IMAGES_BUCKET_NAME: string = process.env.IMAGES_BUCKET_NAME ?? '';
const AWS_ACCESS_KEY_ID: string = process.env.AWS_ACCESS_KEY_ID ?? '';
const AWS_SECRET_ACCESS_KEY: string = process.env.AWS_SECRET_ACCESS_KEY ?? '';
const AWS_REGION: string = process.env.AWS_REGION ?? '';
const NODE_ENV: string = process.env.NODE_ENV ?? 'local';

export {
  ACCESS_TOKEN_SECRET,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  BCRYPT_SALT,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  IMAGES_BUCKET_NAME,
  MONGO_DB_URL,
  NODE_ENV,
  PORT,
  REFRESH_TOKEN_SECRET,
};
