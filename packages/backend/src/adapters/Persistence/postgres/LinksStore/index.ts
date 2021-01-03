import { EntityRepository } from '@mikro-orm/core';
import { PersistencePort } from '../..';
import { failure, success } from '../../../../common/utils/result';
import { toLinkEntity } from '../../../../core/entities/Link';
import { LinkDbEntity } from '../entities/Link';

type InitLinksStoreParams = {
  repository: EntityRepository<LinkDbEntity>;
};

export const initLinksStore = async (initParams: InitLinksStoreParams): Promise<PersistencePort['links']> => {
  const linksRepository = initParams.repository;

  const findLinkByLinkUid: PersistencePort['links']['findLinkByLinkUid'] = async (params) => {
    try {
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
