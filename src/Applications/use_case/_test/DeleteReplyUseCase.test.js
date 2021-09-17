const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-12355',
      commentId: 'comment-123',
      replyId: 'reply-1999',
      userId: 'user-1235555',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadExist = jest.fn()
        .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn()
        .mockImplementation(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn()
        .mockImplementation(() => Promise.resolve({owner: useCasePayload.userId}));
    mockCommentRepository.deleteComment = jest.fn()
        .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteReplyUseCase = new DeleteReplyUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteReplyUseCase.execute(useCasePayload)).resolves.not.toThrow();
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentExist).toBeCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.getCommentById).toBeCalledWith(useCasePayload.replyId);
    expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.replyId);
  });

  it('should throw authorization error when different owner', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-12355',
      commentId: 'comment-123',
      replyId: 'reply-01010',
      userId: 'user-1235555',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository(); useCasePayload.userId;
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn()
        .mockImplementation(() => Promise.resolve({owner: 'user-99999'}));
    mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const deleteReplyUseCase = new DeleteReplyUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteReplyUseCase.execute(useCasePayload)).rejects.toThrow(AuthorizationError);
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentExist).toBeCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.getCommentById).toBeCalledWith(useCasePayload.replyId);
    expect(mockCommentRepository.deleteComment).not.toBeCalled();
  });
});
