import { CoreApi } from '../../core';
import { initRestServer } from './helpers/RestServer';
import { initRoutes } from './helpers/routes';

interface InitBindingParams {
  config: {
    host: string;
    port: number;
  };
  core: CoreApi;
}

export const initBinding = async (initParams: InitBindingParams) => {
  const { core } = initParams;

  const restServer = initRestServer({
    routes: initRoutes({
      core,
    }),
  });

  const run = () => {
    core.api.meta.log(`Starting server...`, {
      level: 'debug',
      producerId: 'bindings-fastify--init-run',
    });

    restServer.listen({
      port: initParams.config.port,
      host: initParams.config.host,
      callback: (error, address) => {
        if (error) {
          core.api.meta.log(error, {
            level: 'fatal',
            producerId: 'bindings-fastify--init-run-callback',
          });

          return process.exit(1);
        }

        core.api.meta.log(`Server listening at ${address}`, {
          level: 'info',
          producerId: 'bindings-fastify--init-run-callback',
        });
      },
    });
  };

  return {
    run,
    _server: restServer._server,
  };
};
