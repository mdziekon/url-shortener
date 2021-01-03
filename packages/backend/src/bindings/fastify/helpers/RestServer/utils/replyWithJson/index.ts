import { FastifyReply } from 'fastify';

interface ReplyWithJSONParams {
  httpCode: number;
  payload: Record<string, unknown>;
  headers?: Record<string, unknown>;
}

export const replyWithJSON = (replyObj: FastifyReply, params: ReplyWithJSONParams): void => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  replyObj.code(params.httpCode);
  replyObj.headers({
    ...defaultHeaders,
    ...params.headers,
  });
  replyObj.send(JSON.stringify(params.payload));
};

type RedirectType = 'moved' | 'temporary' | 'permanent';

export const replyWithRedirect = (replyObj: FastifyReply, params: { location: string; type?: RedirectType }): void => {
  const { type = 'moved' } = params;

  const redirectCode = ({
    moved: 301,
    temporary: 307,
    permanent: 308,
  } as const)[type];

  replyObj.redirect(redirectCode, params.location);
  replyObj.send();
};
