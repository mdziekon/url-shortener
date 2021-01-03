import { failure, success } from '../../../src/common/utils/result';
import { CoreApi } from '../../../src/core';

export const initCoreMock = async (): Promise<CoreApi> => {
  return {
    api: {
      links: {
        createNewLink: async (params) => {
          if (params.input.linkUrl === 'http://example.com') {
            return success({
              newLink: {
                linkUid: 'mockUid',
                linkUrl: 'http://example.com',
              },
            });
          }

          if (params.input.linkUrl === 'http://magiclink.com/force_core_error') {
            return failure({
              errors: [{ code: 'CREATION_ERROR' }],
            });
          }

          return failure({
            errors: [{ code: 'CREATION_ERROR' }],
          });
        },
        findLink: async (params) => {
          if (params.input.linkUid === 'valid___01') {
            return success({
              link: {
                linkUid: 'xxxyyyzzz0',
                linkUrl: 'http://example.com',
              },
            });
          }

          if (params.input.linkUid === 'invalid_01') {
            return failure({
              errors: [{ code: 'LINK_NOT_FOUND' }],
            });
          }

          if (params.input.linkUid === 'invalid_02') {
            return failure({
              errors: [{ code: 'UNKNOWN_ERROR' }],
            });
          }

          return failure({
            errors: [{ code: 'UNKNOWN_ERROR' }],
          });
        },
      },
      meta: {
        log: () => undefined,
      },
    },
  };
};
