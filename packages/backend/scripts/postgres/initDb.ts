import { MikroORM } from '@mikro-orm/core';
import { LinkDbEntity } from '../../src/adapters/Persistence/postgres/entities/Link';
import { loadConfig } from '../../src/bootstrap/default/utils/loadConfig';
import { wait } from '../../src/common/utils/wait/index';

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

  // TODO: Hardcoded wait period to allow the DB container to start up for the first time.
  // Not the best solution, but works for now.
  await wait(5000);

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

  console.log('Migration complete');

  process.exit(0);
};

run();
