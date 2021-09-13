const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UserTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UserTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist new comment and return created comment correctly', async () => {
      // Arrange
      const userId = 'user-1234567890000';
      const threadId = 'thread-1234567899';
      await UserTableTestHelper.addUser({id: userId, username: 'threadusernew'});
      await ThreadsTableTestHelper.addThread({id: threadId, title: 'thread-everything', body: 'it is ok', userId: userId});
      const newComment = new NewComment({
        content: 'I want to add new comment into your thread',
        threadId: threadId,
        userId: userId,
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(newComment);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById('comment-123');
      expect(comments).toHaveLength(1);
    });

    it('should return created comment correctly', async () => {
      // Arrange
      const userId = 'user-1234567890000';
      const threadId = 'thread-1234567899';
      await UserTableTestHelper.addUser({id: userId, username: 'threadusernew'});
      await ThreadsTableTestHelper.addThread({id: threadId, title: 'thread-everything', body: 'it is ok', userId: userId});
      const newComment = new NewComment({
        content: 'I want to add new comment into your thread',
        threadId: threadId,
        userId: userId,
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const createdComment = await commentRepositoryPostgres.addComment(newComment);

      // Assert
      expect(createdComment).toStrictEqual(new CreatedComment({
        id: 'comment-123',
        content: 'I want to add new comment into your thread',
        owner: userId,
      }));
    });
  });

  describe('getCommentById function', () => {
    it('should throw error when not found any comments', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await expect(commentRepositoryPostgres.getCommentById('randomly-unknown')).rejects.toThrow(NotFoundError);
    });

    it('should not throw anything when found', async () => {
      // Arrange
      const userId = 'user-1234567890000';
      const threadId = 'thread-1234567899';
      const commentId = 'comment-123888888';
      await UserTableTestHelper.addUser({id: userId, username: 'threadusernew'});
      await ThreadsTableTestHelper.addThread({id: threadId, title: 'thread-everything', body: 'it is ok', userId: userId});
      await CommentsTableTestHelper.addComment({id: commentId, content: 'Hello 12134', threadId: threadId, userId: userId});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const foundedComment = await commentRepositoryPostgres.getCommentById(commentId);

      // Assert
      expect(foundedComment).toStrictEqual({
        id: commentId,
        owner: userId,
      });
    });
  });

  describe('deleteComment function', () => {
    it('should persist is_delete of the comment to true', async () => {
      // Arrange
      const userId = 'user-1234567890000';
      const threadId = 'thread-1234567899';
      const commentId = 'comment-123888888';
      await UserTableTestHelper.addUser({id: userId, username: 'threadusernew'});
      await ThreadsTableTestHelper.addThread({id: threadId, title: 'thread-everything', body: 'it is ok', userId: userId});
      await CommentsTableTestHelper.addComment({id: commentId, content: 'Hello 12134', threadId: threadId, userId: userId});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      await commentRepositoryPostgres.deleteComment(commentId);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById(commentId);
      expect(comments).toHaveLength(1);
      const comment = comments[0];
      expect(comment.is_delete).toEqual(true);
    });

    it('should return not found', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      await expect(commentRepositoryPostgres.deleteComment('unknown-comment')).rejects.toThrow(NotFoundError);
    });
  });
});
