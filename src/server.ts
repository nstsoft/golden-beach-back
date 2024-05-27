import 'reflect-metadata';

import { app } from 'app';
import { PORT } from 'config';

import { MongoSource } from './data-source';

MongoSource.initialize();

// const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
