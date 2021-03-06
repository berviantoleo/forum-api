/**
 * ThreadRepository Class
 */
class CommentRepository {
  /**
   * Add New Comment
   * @param {*} newComment NewComment Object
   */
  async addComment(newComment) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Add New Reply
   * @param {*} newReply NewReply Object
   */
  async addReply(newReply) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * GetComment by Id
   * @param {string} id Comment Id
   */
  async getCommentById(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get Comment by ThreadId
   * @param {string} threadId thread id
   */
  async getCommentsByThreadId(threadId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get replies
   * @param {string} threadId threadId
   * @param {string} commentId commentId
   * @return {*} All replies
   */
  async getReplies(threadId, commentId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * veryCommentExist by Id
   * @param {string} id Comment Id
   */
  async verifyCommentExist(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * isAlreadyLiked by Id
   * @param {string} id Comment Id
   * @param {string} userId User Id
   */
  async isAlreadyLiked(id, userId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * unlikeComment by Id
   * @param {string} id Comment Id
   * @param {string} userId User Id
   */
  async unlikeComment(id, userId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * likeComment by Id
   * @param {string} id Comment Id
   * @param {string} userId User Id
   */
  async likeComment(id, userId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * countLikes by Id
   * @param {string} id Comment Id
   */
  async countLikes(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Delete Comment by Id
   * @param {string} id Id
   */
  async deleteComment(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
