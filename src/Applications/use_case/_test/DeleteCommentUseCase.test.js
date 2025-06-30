const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-12355',
      commentId: 'comment-123',
      userId: 'user-1235555',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadExist = jest.fn()
        .mockImplementation(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn()
        .mockImplementation(() => Promise.resolve({owner: useCasePayload.userId}));
    mockCommentRepository.deleteComment = jest.fn()
        .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteCommentUseCase.execute(useCasePayload)).resolves.not.toThrow();
    expect(mockThreadRepository.verifyThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentById).toHaveBeenCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(useCasePayload.commentId);
  });

  it('should throw authorization error when different owner', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-12355',
      commentId: 'comment-123',
      userId: 'user-1235555',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn()
        .mockImplementation(() => Promise.resolve({owner: 'user-99999'}));
    mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrow(AuthorizationError);
    expect(mockThreadRepository.verifyThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentById).toHaveBeenCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.deleteComment).not.toHaveBeenCalled();
  });
});
