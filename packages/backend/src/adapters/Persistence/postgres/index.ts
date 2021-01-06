import { MikroORM } from '@mikro-orm/core';
import { PersistencePort } from '..';
import { LinkDbEntity } from './entities/Link';
import { initLinksStore } from './LinksStore';

type InitAdapterParams = {
  db: {
    name: string;
    host: string;
    user: string;
    password: string;
  };
};

export const initAdapter = async (initParams: InitAdapterParams): Promise<PersistencePort> => {
  const orm = await MikroORM.init({
    entities: [LinkDbEntity],
    type: 'postgresql',
    dbName: initParams.db.name,
    clientUrl: `postgresql://${initParams.db.user}@${initParams.db.host}`,
    password: initParams.db.password,
  });

  await orm.connect();

  const linksStore = await initLinksStore({
    entityManager: orm.em,
  });

  return {
    links: linksStore,
  };
};
