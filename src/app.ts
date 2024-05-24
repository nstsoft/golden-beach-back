import express from 'express';

import { userService } from './constructors';
import { UserController } from './controllers';
import { MongoSource } from './data-source';

MongoSource.initialize();

const app = express();

app.use(express.json());

app.use('/api/v1', new UserController(userService).route);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
