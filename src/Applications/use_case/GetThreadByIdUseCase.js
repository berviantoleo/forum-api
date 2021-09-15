const Comment = require('../../Domains/comments/entities/Comment');
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
    const mappedComments = comments.map((comment) => new Comment({...comment, isReply: false}));
    for (const comment of mappedComments) {
      const replies = await this._commentRepository.getReplies(threadId, comment.id);
      comment.replies = replies.map((reply) => new Comment({...reply, isReply: true}));
    }
    thread.comments = mappedComments;
    return thread;
  }
}

module.exports = GetThreadByIdUseCase;
