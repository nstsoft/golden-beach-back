import './config';

import cors from 'cors';
import express, { Request, Response } from 'express';

import { eventService, imageService, menuService, userService } from './constructors';
import { EventController, ImageController, MenuController, UserController } from './controllers';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  const pagination = {
    skip: 0,
    limit: 20,
  };
  if (!isNaN(+req.query.skip)) {
    pagination.skip = Number(req.query.skip);
  }
  if (!isNaN(+req.query.limit)) {
    pagination.limit = Number(req.query.limit);
  }

  Object.assign(req, { pagination });

  return next();
});

const apiRouter = express.Router();
apiRouter.use(new ImageController(imageService).route);
apiRouter.use(new UserController(userService).route);
apiRouter.use(new EventController(eventService, imageService).route);
apiRouter.use(new MenuController(menuService, imageService).route);

app.use('/api/v1', apiRouter);

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
