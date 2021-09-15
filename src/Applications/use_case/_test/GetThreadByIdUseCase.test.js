const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');

describe('GetThreadByIdUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar saat hanya comments.
   */
  it('should orchestrating the get thread by id action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };
    const expectedExistingThread = {
      id: useCasePayload.threadId,
      body: 'hello title body',
      title: 'existing title',
      date: new Date().toISOString(),
      username: 'user123',
    };
    const expectedComments = [
      {
        id: 'comment-123',
        username: 'bluk',
        date: new Date(),
        content: 'Comment',
        isdeleted: false,
      },
    ];

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedExistingThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedComments));
    mockCommentRepository.getReplies = jest.fn()
        .mockImplementation(() => Promise.resolve([]));
    /** creating use case instance */
    const getThreadUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const existingThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(existingThread).toStrictEqual(expectedExistingThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
  });

  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar saat memiliki reply.
   */
  it('should orchestrating the get thread by id action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };
    const expectedExistingThread = {
      id: useCasePayload.threadId,
      body: 'hello title body',
      title: 'existing title',
      date: new Date().toISOString(),
      username: 'user123',
    };
    const expectedComments = [
      {
        id: 'comment-123',
        username: 'bluk',
        date: new Date(),
        content: 'Comment',
        isdeleted: false,
      },
    ];
    const expectedReplies = [
      {
        id: 'reply-123',
        username: 'bluk',
        date: new Date(),
        content: 'Comment',
        isdeleted: false,
      },
    ];

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedExistingThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedComments));
    mockCommentRepository.getReplies = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedReplies));
    /** creating use case instance */
    const getThreadUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const existingThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(existingThread).toStrictEqual(expectedExistingThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
  });
});
