const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
/**
 * DeleteReplyUseCase
 */
class DeleteReplyUseCase {
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
    const {threadId, commentId, replyId, userId} = useCasePayload;
    await this._threadRepository.verifyThreadExist(threadId);
    await this._commentRepository.verifyCommentExist(commentId);
    const {owner} = await this._commentRepository.getCommentById(replyId);
    if (owner !== userId) {
      throw new AuthorizationError('tidak dapat menghapus reply yang bukan milik anda');
    }
    await this._commentRepository.deleteComment(replyId);
  }
}

module.exports = DeleteReplyUseCase;
