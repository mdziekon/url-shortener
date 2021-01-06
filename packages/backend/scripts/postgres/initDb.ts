import fastify from 'fastify';
import { MikroORM } from '@mikro-orm/core';
import { LinkDbEntity } from '../../src/adapters/Persistence/postgres/entities/Link';
import { loadConfig } from '../../src/bootstrap/default/utils/loadConfig';

type InitDbParams = {
  db: {
    name: string;
    host: string;
    user: string;
    password: string;
  };
};

const initDb = async (initParams: InitDbParams) => {
  const orm = await MikroORM.init({
    entities: [LinkDbEntity],
    type: 'postgresql',
    dbName: initParams.db.name,
    clientUrl: `postgresql://${initParams.db.user}@${initParams.db.host}`,
    password: initParams.db.password,
  });

  await orm.connect();

  try {
    const schemaGenerator = orm.getSchemaGenerator();

    await schemaGenerator.dropSchema();
    await schemaGenerator.createSchema();
    await schemaGenerator.updateSchema();

    await orm.close();
  } catch (error: unknown) {
    await orm.close();

    throw error;
  }
};

const run = async () => {
  try {
    const envConfig = loadConfig();

    await initDb({
      db: envConfig.db,
    });
  } catch (exception: unknown) {
    throw exception;
  }

  console.log('Migration complete, starting an HTTP server on port :12345 to signal readiness...');

  const signalServer = fastify();

  signalServer.listen(12345, '0.0.0.0', (error, address) => {
    console.log('Server is ready');
  });

  // process.exit(0);
};

run();
