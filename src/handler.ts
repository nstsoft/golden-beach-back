import serverlessExpress from '@codegenie/serverless-express';
import { type APIGatewayEvent, type Callback, type Context, type Handler } from 'aws-lambda';

import { app } from './app';

let serverlessExpressInstance: Handler<unknown, unknown>;

async function setup(event: APIGatewayEvent, context: Context, cb: Callback) {
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context, cb);
}

const handler: Handler = async function (event: APIGatewayEvent, context: Context, cb: Callback) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context, cb);

  return setup(event, context, cb);
};

export { handler };
