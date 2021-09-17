/**
 * LikeCommentUseCase
 */
class LikeCommentUseCase {
  /**
   * Constructor
   * @param {*} param0 DI
   */
  constructor({commentRepository, threadRepository}) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  /**
   * Execute
   * @param {*} useCasePayload UseCase
   */
  async execute(useCasePayload) {
    const {threadId, commentId, userId} = useCasePayload;
    await this._threadRepository.verifyThreadExist(threadId);
    await this._commentRepository.verifyCommentExist(commentId);
    const isAlreadyLiked = await this._commentRepository.isAlreadyLiked(commentId, userId);
    if (isAlreadyLiked) {
      await this._commentRepository.unlikeComment(commentId, userId);
    } else {
      await this._commentRepository.likeComment(commentId, userId);
    }
  }
}

module.exports = LikeCommentUseCase;
