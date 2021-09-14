/**
 * GetThreadByIdUseCase
 */
class GetThreadByIdUseCase {
  /**
   * Constructor
   * @param {*} param0 DI
   */
  constructor({threadRepository, commentRepository}) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  /**
   * Execute
   * @param {*} useCasePayload UseCase
   * @return {*} User
   */
  async execute(useCasePayload) {
    const {threadId} = useCasePayload;
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(threadId);
    for (const comment of comments) {
      const replies = await this._commentRepository.getReplies(threadId, comment.id);
      comment.replies = replies;
    }
    thread.comments = comments;
    return thread;
  }
}

module.exports = GetThreadByIdUseCase;
