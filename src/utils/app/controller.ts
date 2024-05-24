import 'reflect-metadata';

import express, { NextFunction, Request, Response, Router } from 'express';

export function Controller(routePrefix: string): ClassDecorator {
  return function (target: unknown) {
    Reflect.defineMetadata('routePrefix', routePrefix, target);
  };
}

export function BaseMethood(route: string, method: string): MethodDecorator {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('route', { route, method }, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const result = await originalMethod.call(this, req, res, next);
        return res.json(result);
      } catch (error) {
        next(error);
      }
    };
  };
}
export function Get(route: string): MethodDecorator {
  return BaseMethood(route, 'get');
}
export function Post(route: string): MethodDecorator {
  return BaseMethood(route, 'post');
}
export function Put(route: string): MethodDecorator {
  return BaseMethood(route, 'put');
}
export function Patch(route: string): MethodDecorator {
  return BaseMethood(route, 'patch');
}
export function Delete(route: string): MethodDecorator {
  return BaseMethood(route, 'delete');
}

export abstract class BaseController {
  private readonly router: Router = express.Router();

  constructor() {
    const routePrefix = Reflect.getMetadata('routePrefix', this.constructor);
    const prototype = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(prototype).forEach((methodName) => {
      const routeData = Reflect.getMetadata('route', prototype, methodName);
      if (routeData) {
        const handler = this[methodName].bind(this);

        this.router[routeData.method](`${routePrefix}${routeData.route}`, handler);
      }
    });
  }

  get route() {
    return this.router.bind(this);
  }
}
