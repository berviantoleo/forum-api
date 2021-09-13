const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper =
 require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

describe('/threads/{threadId}/comments/{commentId}/replies endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe('when POST /threads/{threadId}/comments/{commentId}/replies', () => {
    it('should response 201 and new comment', async () => {
      // Arrange
      const requestPayload = {
        content: 'My random comment of reply is real/',
      };
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const commentId = 'comment-1000';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedReply).toBeDefined();
      expect(responseJson.data.addedReply.owner).toBeDefined();
      expect(responseJson.data.addedReply.content).toEqual(requestPayload.content);
      expect(responseJson.data.addedReply.id).toContain('reply-');
    });

    it('should response 400 if thread payload not contain needed property',
        async () => {
          // Arrange
          const requestPayload = {
          };
          const threadId = 'thread-12366669';
          const userId = 'user-1233414';
          const commentId = 'comment-1000';
          const accessToken = await ServerTestHelper.getAccessToken(userId);
          await ThreadsTableTestHelper.addThread({id: threadId, userId});
          await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
          const server = await createServer(container);

          // Action
          const response = await server.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments/${commentId}/replies`,
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
              toEqual('harus mengirimkan content, threadId, dan commentId');
        });

    it('should response 400 if thread payload wrong data type', async () => {
      // Arrange
      const requestPayload = {
        content: 9999999999,
      };
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const commentId = 'comment-1000';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
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
          toEqual('content, threadId, dan commentId harus string');
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
        url: `/threads/thread-notexistss/comments/comments-notexist/replies`,
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
      const commentId = 'comment-1000';
      await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
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

  describe('when DELETE /threads/{threadId}/comments/{commentId}/replies/{replyId}', () => {
    it('should response 200 and delete the reply', async () => {
      // Arrange
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const commentId = 'comment-1000';
      const replyId = 'reply-919191';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
      await CommentsTableTestHelper.addReply({id: replyId, commentId, threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 403 if not reply owner',
        async () => {
          // Arrange
          const threadId = 'thread-12366669';
          const userId = 'user-1233414';
          const commentId = 'comment-12344';
          const replyId = 'reply-919191';
          await ServerTestHelper.getAccessToken(userId);
          const accessToken = await ServerTestHelper.getAccessToken('random-user', 'randomuser');
          await ThreadsTableTestHelper.addThread({id: threadId, userId});
          await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
          await CommentsTableTestHelper.addReply({id: replyId, commentId, threadId, userId});
          const server = await createServer(container);

          // Action
          const response = await server.inject({
            method: 'DELETE',
            url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // Assert
          const responseJson = JSON.parse(response.payload);
          expect(response.statusCode).toEqual(403);
          expect(responseJson.status).toEqual('fail');
          expect(responseJson.message).toEqual('tidak dapat menghapus reply yang bukan milik anda');
        });

    it('should response 404 if reply not found', async () => {
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const commentId = 'comment-12344';
      const replyId = 'reply-random';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('comment tidak ditemukan');
    });

    it('should response 404 if threadId not found', async () => {
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const commentId = 'comment-12344';
      const replyId = 'reply-1234';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('thread tidak ditemukan');
    });

    it('should response 404 if commentId not found', async () => {
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const commentId = 'comment-12344';
      const replyId = 'reply-1234';
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('comment tidak ditemukan');
    });


    it('should response 401 if without token', async () => {
      // Arrange
      const requestPayload = {
        content: 'Any comment please',
      };
      const threadId = 'thread-12366669';
      const userId = 'user-1233414';
      const commentId = 'comment-9999';
      const replyId = 'reply-919191';
      await ServerTestHelper.getAccessToken(userId);
      await ThreadsTableTestHelper.addThread({id: threadId, userId});
      await CommentsTableTestHelper.addComment({id: commentId, threadId, userId});
      await CommentsTableTestHelper.addReply({id: replyId, commentId, threadId, userId});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
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
