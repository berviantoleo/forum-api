const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
/**
 * DeleteCommentUseCase
 */
class DeleteCommentUseCase {
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
    const {owner} = await this._commentRepository.getCommentById(commentId);
    if (owner !== userId) {
      throw new AuthorizationError('tidak dapat menghapus komentar yang bukan milik anda');
    }
    await this._commentRepository.deleteComment(commentId);
  }
}

module.exports = DeleteCommentUseCase;
