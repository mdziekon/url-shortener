import { initBinding } from '.';
import { expectJSONResponse } from '../../../test/helpers/expectations/toBeJSONResponse';
import { expectRedirectResponse } from '../../../test/helpers/expectations/toBeRedirectResponse';
import { initCoreMock } from '../../../test/mocks/core';

describe('Fastify server', () => {
  const instantiateServer = async () => {
    const server = initBinding({
      config: {
        host: 'localhost',
        port: 50123,
      },
      core: await initCoreMock(),
    });

    return server;
  };

  describe('POST /links', () => {
    it('responds with success when provided with valid body', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'POST',
        url: '/links',
        payload: {
          linkUrl: 'http://example.com',
        },
      });

      expectJSONResponse(response, {
        statusCode: 201,
        bodyMatch: {},
      });
    });

    it('responds with error when provided with empty linkUrl', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'POST',
        url: '/links',
        payload: {
          linkUrl: '',
        },
      });

      expectJSONResponse(response, {
        statusCode: 400,
        bodyMatch: {
          error: {
            code: 'INVALID_PARAMS',
          },
        },
      });
    });

    it('responds with error when provided with invalid linkUrl', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'POST',
        url: '/links',
        payload: {
          linkUrl: '"NOT_A_VALID_URL"',
        },
      });

      expectJSONResponse(response, {
        statusCode: 400,
        bodyMatch: {
          error: {
            code: 'INVALID_PARAMS',
          },
        },
      });
    });

    it('responds with error when core replies with an error', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'POST',
        url: '/links',
        payload: {
          linkUrl: 'http://magiclink.com/force_core_error',
        },
      });

      expectJSONResponse(response, {
        statusCode: 500,
        bodyMatch: {
          error: true,
        },
      });
    });
  });

  describe('GET /links/:linkUid', () => {
    it('responds with success when asked for a valid linkUid', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/valid___01',
      });

      expectJSONResponse(response, {
        statusCode: 200,
        bodyMatch: {
          linkUrl: expect.stringMatching(''),
        },
      });
    });

    it('responds with error when asked for an invalid (broken) linkUid', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/?$#',
      });

      expectJSONResponse(response, {
        statusCode: 400,
        bodyMatch: {
          error: {
            code: 'INVALID_PARAMS',
          },
        },
      });
    });

    it('responds with error when asked for non-existent linkUid', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/invalid_01',
      });

      expectJSONResponse(response, {
        statusCode: 404,
        bodyMatch: {
          error: true,
        },
      });
    });

    it('responds with error when core replies with an error', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/invalid_02',
      });

      expectJSONResponse(response, {
        statusCode: 500,
        bodyMatch: {
          error: true,
        },
      });
    });
  });

  describe('GET /links/:linkUid/redirect', () => {
    it('responds with success when asked for a valid linkUid', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/valid___01/redirect',
      });

      expectRedirectResponse(response, {
        locationMatcher: expect.stringContaining(''),
      });
    });

    it('responds with error when asked for an invalid (broken) linkUid', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/?$#/redirect',
      });

      expectJSONResponse(response, {
        statusCode: 400,
        bodyMatch: {
          error: {
            code: 'INVALID_PARAMS',
          },
        },
      });
    });

    it('responds with error when asked for non-existent linkUid', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/invalid_01/redirect',
      });

      expectJSONResponse(response, {
        statusCode: 404,
        bodyMatch: {
          error: true,
        },
      });
    });

    it('responds with error when core replies with an error', async () => {
      const server = await instantiateServer();

      const response = await server._server.inject({
        method: 'GET',
        url: '/links/invalid_02/redirect',
      });

      expectJSONResponse(response, {
        statusCode: 500,
        bodyMatch: {
          error: true,
        },
      });
    });
  });
});
