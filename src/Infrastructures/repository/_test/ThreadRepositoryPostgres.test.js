const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UserTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UserTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getThreadById function', () => {
    it('should throw NotFoundError when id not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.getThreadById('thread-xxxxx')).rejects.toThrowError(NotFoundError);
    });

    it('should return correct data when found an id', async () => {
      // Arrange
      const userId = 'user-123456789';
      const threadId = 'thread-999999';
      await UserTableTestHelper.addUser({id: userId, username: 'threaduser'});
      await ThreadsTableTestHelper.addThread({id: threadId, userId: userId});
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      const thread = await threadRepositoryPostgres.getThreadById(threadId);
      expect(thread.id).toEqual(threadId);
    });
  });

  describe('addThread function', () => {
    it('should persist new thread and return created thread correctly', async () => {
      // Arrange
      const userId = 'user-1234567890000';
      await UserTableTestHelper.addUser({id: userId, username: 'threadusernew'});
      const newThread = new NewThread({
        title: 'New Thread Title',
        body: 'New Thread Body',
        userId: userId,
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepositoryPostgres.addThread(newThread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-123');
      expect(threads).toHaveLength(1);
    });

    it('should return created thread correctly', async () => {
      // Arrange
      const userId = 'user-12345678900001';
      await UserTableTestHelper.addUser({id: userId, username: 'threadusernew12'});
      const newThread = new NewThread({
        title: 'New Thread Title',
        body: 'New Thread Body',
        userId: userId,
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const createdThread = await threadRepositoryPostgres.addThread(newThread);

      // Assert
      expect(createdThread).toStrictEqual(new CreatedThread({
        id: 'thread-123',
        title: 'New Thread Title',
        body: 'New Thread Body',
        owner: userId,
      }));
    });
  });

  describe('verifyThreadExist function', () => {
    it('should throw NotFoundError when id not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyThreadExist('thread-xxxxx')).rejects.toThrowError(NotFoundError);
    });

    it('should not return exception when found', async () => {
      // Arrange
      const userId = 'user-123456789';
      const threadId = 'thread-999999';
      await UserTableTestHelper.addUser({id: userId, username: 'threaduser'});
      await ThreadsTableTestHelper.addThread({id: threadId, userId: userId});
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyThreadExist(threadId)).resolves.not.toThrow();
    });
  });
});
