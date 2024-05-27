import './config';

import cors from 'cors';
import express, { Request, Response } from 'express';

import { eventService, imageService, userService } from './constructors';
import { EventController, UserController } from './controllers';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

app.use('/api/v1', new UserController(userService).route);
app.use('/api/v1', new EventController(eventService, imageService).route);

app.get('/', (req: Request, res: Response) => {
  res.json('Pong');
});

app.use(function clientErrorHandler(err: any, req: Request, res: Response, _: unknown) {
  return res.status(err.status || 500).json({
    message: err.message,
    errror: { ...err },
  });
});
export { app };
