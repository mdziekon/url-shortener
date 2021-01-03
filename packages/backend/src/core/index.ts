import { PromiseValue } from '../common/types/promises';
import { createNewLink, findLink } from './api/links';
import { log } from './api/meta';
import { CoreContext } from './context';
import { LoggingPort } from './ports/Logging';
import { PersistencePort } from './ports/Persistence';

interface InitCoreParams {
  adapters: {
    persistence: PersistencePort;
    logging: LoggingPort;
  };
}

export const initCore = async (initParams: InitCoreParams) => {
  const ctx: CoreContext = {
    components: {
      persistence: initParams.adapters.persistence,
      logging: initParams.adapters.logging,
    },
  };

  return {
    api: {
      links: {
        createNewLink: async (params: { input: Parameters<typeof createNewLink>[0]['input'] }) => {
          return await createNewLink({
            ctx,
            input: params.input,
          });
        },
        findLink: async (params: { input: Parameters<typeof findLink>[0]['input'] }) => {
          return await findLink({
            ctx,
            input: params.input,
          });
        },
      },
      meta: {
        log: ctx.components.logging.log,
      },
    },
  };
};

export type CoreApi = PromiseValue<ReturnType<typeof initCore>>;
