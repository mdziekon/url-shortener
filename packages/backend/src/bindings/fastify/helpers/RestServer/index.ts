import { RequestContext } from '@mikro-orm/core';
import fastify, { RouteHandlerMethod } from 'fastify';

export interface RouteEntry {
  method: 'GET' | 'POST';
  url: string;
  handler: RouteHandlerMethod;
}

export interface InitRestServerParams {
  routes: RouteEntry[];
}

export const initRestServer = (params: InitRestServerParams) => {
  const server = fastify();

  params.routes.forEach((route) => {
    server.route({
      method: route.method,
      url: route.url,
      handler: route.handler,
    });
  });

  interface ListenParams {
    port: number;
    host: string;
    callback: (err: Error, address: string) => void;
  }

  const listen = (listenParams: ListenParams) => {
    server.listen(listenParams.port, listenParams.host, listenParams.callback);
  };

  return {
    listen,
    _server: server,
  };
};
