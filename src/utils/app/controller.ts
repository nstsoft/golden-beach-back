import express, { NextFunction, Request, Response, Router } from 'express';

type RouteMiddleWare = (req: Request, res: Response, next: NextFunction) => Promise<unknown> | void;

export function Controller(routePrefix: string, middlewares?: RouteMiddleWare[]): ClassDecorator {
  const controllerMiddlewares = Array.isArray(middlewares) ? middlewares : [];
  return function (target: unknown) {
    Reflect.defineMetadata('routePrefix', { routePrefix, controllerMiddlewares }, target);
  };
}

export function BaseMethood(
  route: string,
  method: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares: RouteMiddleWare[] = [],
): MethodDecorator {
  const routeMiddlewares = Array.isArray(middlewares) ? middlewares : [];
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('route', { route, method, routeMiddlewares, preBuildMiddlewares }, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const result = await originalMethod.call(this, req, res, next);

        return res.json(result);
      } catch (error) {
        return next(error);
      }
    };
  };
}
export function Get(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethood(route, 'get', middlewares, preBuildMiddlewares);
}
export function Post(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethood(route, 'post', middlewares, preBuildMiddlewares);
}
export function Put(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethood(route, 'put', middlewares, preBuildMiddlewares);
}
export function Patch(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethood(route, 'patch', middlewares, preBuildMiddlewares);
}
export function Delete(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethood(route, 'delete', middlewares, preBuildMiddlewares);
}

export abstract class BaseController {
  private readonly router: Router = express.Router();

  constructor() {
    const { routePrefix, controllerMiddlewares } = Reflect.getMetadata('routePrefix', this.constructor) as {
      routePrefix: string;
      controllerMiddlewares?: RouteMiddleWare[];
    };

    const prototype = Object.getPrototypeOf(this);

    Object.getOwnPropertyNames(prototype).forEach((methodName: string) => {
      const routeData = Reflect.getMetadata('route', prototype, methodName);
      if (routeData) {
        const { route, method, routeMiddlewares } = routeData;
        const handler = this[methodName].bind(this);

        // const methods = controllerMiddlewares
        //   .concat(routeMiddlewares)
        //   .map((middleware) => async (req: Request, res: Response, next: NextFunction) => {
        //     let finish = false;
        //     const nextFunction = (...args: unknown[]) => {
        //       finish = args.length > 0;
        //       return next(...args);
        //     };
        //     try {
        //       await middleware(req, res, nextFunction);
        //       if (!finish) {
        //         return nextFunction();
        //       }
        //     } catch (error) {
        //       if (!finish) {
        //         return nextFunction(error);
        //       }
        //     }
        //   });

        this.router[method](`${routePrefix}${route}`, ...controllerMiddlewares, routeMiddlewares, handler);
      }
    });
  }

  get route() {
    return this.router.bind(this);
  }
}
