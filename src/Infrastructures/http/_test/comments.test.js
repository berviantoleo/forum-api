const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper =
 require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

describe('/threads/{threadId}/comments endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe('when POST /threads/{threadId}/comments', () => {
    it('should response 201 and new comment', async () => {
      // Arrange
      const requestPayload = {
        content: 'My random comment is real/',
      };
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
      expect(responseJson.data.addedComment.owner).toBeDefined();
      expect(responseJson.data.addedComment.content).toEqual(requestPayload.content);
      expect(responseJson.data.addedComment.id).toContain('comment-');
    });

    it('should response 400 if thread payload not contain needed property',
        async () => {
          // Arrange
          const requestPayload = {
          };
          const threadId = 'thread-12366669';
          const userId = 'user-1233414';
          const accessToken = await ServerTestHelper.getAccessToken(userId);
          await ThreadsTableTestHelper.addThread({id: threadId, userId});
          const server = await createServer(container);

          // Action
          const response = await server.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments`,
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
              toEqual('harus mengirimkan content');
        });

    it('should response 400 if thread payload wrong data type', async () => {
      // Arrange
      const requestPayload = {
        content: 9999999999,
      };
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
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
          toEqual('content harus string');
    });

    it('should response 404 if threadId not found', async () => {
      // Arrange
      const requestPayload = {
        content: 'My random comment is real/',
      };
      const userId = 'user-1233414';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/thread-notexistss/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).
          toEqual('thread tidak ditemukan');
    });

    it('should response 401 if without token', async () => {
      // Arrange
      const requestPayload = {
        content: 'Any comment please',
      };
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      await ServerTestHelper.getAccessToken(userId); // just for create user
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
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
