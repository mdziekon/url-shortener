import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { PersistencePort } from '../..';
import { failure, success } from '../../../../common/utils/result';
import { toLinkEntity } from '../../../../core/entities/Link';
import { LinkDbEntity } from '../entities/Link';

type InitLinksStoreParams = {
  entityManager: EntityManager;
};

export const initLinksStore = async (initParams: InitLinksStoreParams): Promise<PersistencePort['links']> => {
  type RequestCtx = Record<string, unknown>;
  const entityManagers = new WeakMap<RequestCtx, EntityManager>();

  const getEntityManager = (requestCtx: RequestCtx) => {
    if (!entityManagers.has(requestCtx)) {
      entityManagers.set(requestCtx, initParams.entityManager.fork());
    }

    const existingManager = entityManagers.get(requestCtx);

    if (!existingManager) {
      throw new Error();
    }
    return existingManager;
  };

  const findLinkByLinkUid: PersistencePort['links']['findLinkByLinkUid'] = async (params) => {
    try {
      const emFork = getEntityManager(params.requestCtx);
      const linksRepository = emFork.getRepository(LinkDbEntity);

      const findResult = await linksRepository.find(
        {
          linkUid: params.linkUid,
        },
        {
          limit: 1,
        },
      );

      if (!findResult.length) {
        return success({
          entity: undefined,
        });
      }

      const decodeResult = toLinkEntity(findResult[0]);

      if (!decodeResult.isSuccess) {
        // TODO: Improve error reporting
        throw new Error();
      }

      return success({
        entity: decodeResult.payload.output,
      });
    } catch (exception: unknown) {
      return failure({
        errors: [
          {
            code: 'UNKNOWN_ERROR',
          },
        ],
      });
    }
  };

  const addLink: PersistencePort['links']['addLink'] = async (params) => {
    try {
      const emFork = getEntityManager(params.requestCtx);
      const linksRepository = emFork.getRepository(LinkDbEntity);

      const newLink = new LinkDbEntity({
        linkUid: params.linkUid,
        linkUrl: params.linkUrl,
      });

      await linksRepository.persist(newLink).flush();

      return success(null);
    } catch (exception: unknown) {
      return failure({
        errors: [
          {
            code: 'UNKNOWN_ERROR',
          },
        ],
      });
    }
  };

  return {
    findLinkByLinkUid,
    addLink,
  };
};
