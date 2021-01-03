import { RouteEntryWithCore } from '..';
import { replyWithJSON } from '../../RestServer/utils/replyWithJson';
import { parseParams } from './inputValidation';

export const linksByLinkUidGetRoute: RouteEntryWithCore = {
  method: 'GET',
  url: '/links/:linkUid',
  handler: (core) => async (request, reply) => {
    const parseParamsResult = parseParams(request.params);

    if (!parseParamsResult.isSuccess) {
      const response = {
        error: {
          code: 'INVALID_PARAMS',
        },
      };

      replyWithJSON(reply, {
        httpCode: 400,
        payload: response,
      });

      return;
    }

    const params = parseParamsResult.payload.value;

    const result = await core.api.links.findLink({
      input: {
        linkUid: params.linkUid,
      },
    });

    if (!result.isSuccess) {
      const response = {
        error: true,
      };

      core.api.meta.log(result.payload, {
        level: 'error',
        producerId: 'bindings-fastify--linksByLinkUidGetRoute--handler',
      });

      const errorCode = (() => {
        if (result.payload.errors[0].code === 'LINK_NOT_FOUND') {
          return 404;
        }

        return 500;
      })();

      replyWithJSON(reply, {
        httpCode: errorCode,
        payload: response,
      });

      return;
    }

    const response = {
      linkUrl: result.payload.link.linkUrl,
    };

    replyWithJSON(reply, {
      httpCode: 200,
      payload: response,
    });
  },
};
