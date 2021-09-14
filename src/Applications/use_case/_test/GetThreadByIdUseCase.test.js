const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');

describe('GetThreadByIdUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add comment action correctly', async () => {
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
        date: new Date().toISOString(),
        content: 'Comment',
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
});
