import 'reflect-metadata';

import serverlessExpress from '@codegenie/serverless-express';
import { type APIGatewayEvent, type Callback, type Context, type Handler } from 'aws-lambda';
import { DataSource } from 'typeorm';

import { app } from './app';
import { MongoSource } from './data-source';

let serverlessExpressInstance: Handler<unknown, unknown>;
let dataSource: DataSource;

const initializeDataSource = async () => {
  if (!dataSource) {
    dataSource = await MongoSource.initialize();
  }
  return dataSource;
};

async function setup(event: APIGatewayEvent, context: Context, cb: Callback) {
  serverlessExpressInstance = serverlessExpress({ app });
  dataSource = await initializeDataSource();
  return serverlessExpressInstance(event, context, cb);
}

const handler: Handler = async function (event: APIGatewayEvent, context: Context, cb: Callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context, cb);

  return setup(event, context, cb);
};

export { handler };
