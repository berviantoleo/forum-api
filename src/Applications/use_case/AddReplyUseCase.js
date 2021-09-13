const NewReply = require('../../Domains/comments/entities/NewReply');

/**
 * AddUserUseCase
 */
class AddReplyUseCase {
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
   * @return {*} User
   */
  async execute(useCasePayload) {
    const newReply = new NewReply(useCasePayload);
    await this._threadRepository.verifyThreadExist(newReply.threadId);
    await this._commentRepository.verifyCommentExist(newReply.commentId);
    return this._commentRepository.addReply(newReply);
  }
}

module.exports = AddReplyUseCase;
