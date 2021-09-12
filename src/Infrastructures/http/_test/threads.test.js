const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper =
 require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and new threads', async () => {
      // Arrange
      const requestPayload = {
        title: 'Help Me to Find Good Title',
        body: 'I don\'t know what should I write here. Please tell me.',
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
      expect(responseJson.data.addedThread.title).toEqual(requestPayload.title);
      expect(responseJson.data.addedThread.id).toContain('thread-');
    });

    it('should response 400 if thread payload not contain needed property',
        async () => {
          // Arrange
          const requestPayload = {
            title: 'Help Me to Find Good Title',
          };
          const accessToken = await ServerTestHelper.getAccessToken();
          const server = await createServer(container);

          // Action
          const response = await server.inject({
            method: 'POST',
            url: '/threads',
            payload: requestPayload,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // Assert
          const responseJson = JSON.parse(response.payload);
          expect(response.statusCode).toEqual(400);
          expect(responseJson.status).toEqual('fail');
          expect(responseJson.message).
              toEqual('harus mengirimkan title dan body');
        });

    it('should response 400 if thread payload wrong data type', async () => {
      // Arrange
      const requestPayload = {
        title: 9999999999,
        body: 'I don\'t know what should I write here. Please tell me.',
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).
          toEqual('title dan body harus string');
    });

    it('should response 401 if without token', async () => {
      // Arrange
      const requestPayload = {
        title: 'Any title please',
        body: 'I don\'t know what should I write here. Please tell me.',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });
  });
});
