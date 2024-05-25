import express, { NextFunction, Request, Response } from 'express';
import {} from 'http-errors';

import { userService } from './constructors';
import { UserController } from './controllers';
import { MongoSource } from './data-source';

MongoSource.initialize();

const app = express();

app.use(express.json());

app.use('/api/v1', new UserController(userService).route);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(function clientErrorHandler(err: any, req: Request, res: Response, _: NextFunction) {
  console.log(err);
  return res.status(err.status || 500).json({
    message: err.message,
  });
});
export { app };
