const NewComment = require('../../Domains/comments/entities/NewComment');

/**
 * AddUserUseCase
 */
class AddCommentUseCase {
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
    const newComment = new NewComment(useCasePayload);
    await this._threadRepository.verifyThreadExist(newComment.threadId);
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
