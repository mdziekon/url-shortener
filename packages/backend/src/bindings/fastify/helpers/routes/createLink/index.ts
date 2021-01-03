import { RouteEntryWithCore } from '..';
import { replyWithJSON } from '../../RestServer/utils/replyWithJson';
import { parseParams } from './inputValidation';

export const linksPostRoute: RouteEntryWithCore = {
  method: 'POST',
  url: '/links',
  handler: (core) => async (request, reply) => {
    const parseParamsResult = parseParams(request.body);

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

    const result = await core.api.links.createNewLink({
      input: {
        linkUrl: params.linkUrl,
      },
    });

    if (!result.isSuccess) {
      const response = {
        error: true,
      };

      core.api.meta.log(result.payload, {
        level: 'error',
        producerId: 'bindings-fastify--linksPostRoute-handler',
      });

      replyWithJSON(reply, {
        httpCode: 500,
        payload: response,
      });

      return;
    }

    const response = {
      linkUid: result.payload.newLink.linkUid,
    };

    replyWithJSON(reply, {
      httpCode: 201,
      payload: response,
    });
  },
};
