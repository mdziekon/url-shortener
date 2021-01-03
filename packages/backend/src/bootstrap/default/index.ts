import { initAdapter as initConsoleLoggingAdapter } from '../../adapters/Logging/console';
import { initAdapter as initPostgresPersistenceAdapter } from '../../adapters/Persistence/postgres';
import { initBinding } from '../../bindings/fastify';
import { initCore } from '../../core';
import { loadConfig } from './utils/loadConfig';

export const run = async () => {
  const loggingAdapter = await initConsoleLoggingAdapter();

  try {
    const envConfig = loadConfig();

    const persistenceAdapter = await initPostgresPersistenceAdapter({
      db: envConfig.db,
    });

    const core = await initCore({
      adapters: {
        persistence: persistenceAdapter,
        logging: loggingAdapter,
      },
    });

    const binding = await initBinding({
      config: envConfig.server,
      core,
    });

    binding.run();
  } catch (exception: unknown) {
    if (exception instanceof Error && exception.message) {
      loggingAdapter.log(exception.message, {
        level: 'error',
        producerId: 'bootstrap-run',
      });
    }

    loggingAdapter.log(exception, {
      level: 'error',
      producerId: 'bootstrap-run',
    });
  }
};
