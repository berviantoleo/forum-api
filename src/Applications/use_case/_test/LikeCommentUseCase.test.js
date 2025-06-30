const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const LikeCommentUseCase = require('../LikeCommentUseCase');

describe('LikeCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the like action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-random',
      commentId: 'comment-random',
      userId: 'user-random',
    };

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.isAlreadyLiked = jest.fn(() => Promise.resolve(false));
    mockCommentRepository.likeComment = jest.fn(() => Promise.resolve());
    mockCommentRepository.unlikeComment = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const likeCommentUse = new LikeCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await likeCommentUse.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentExist).toHaveBeenCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.isAlreadyLiked).toHaveBeenCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockCommentRepository.likeComment).toHaveBeenCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockCommentRepository.unlikeComment).not.toHaveBeenCalled();
  });

  it('should orchestrating the unlike action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-random',
      commentId: 'comment-random',
      userId: 'user-random',
    };

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.isAlreadyLiked = jest.fn(() => Promise.resolve(true));
    mockCommentRepository.likeComment = jest.fn(() => Promise.resolve());
    mockCommentRepository.unlikeComment = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const likeCommentUse = new LikeCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await likeCommentUse.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentExist).toHaveBeenCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.isAlreadyLiked).toHaveBeenCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockCommentRepository.unlikeComment).toHaveBeenCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockCommentRepository.likeComment).not.toHaveBeenCalled();
  });
});
