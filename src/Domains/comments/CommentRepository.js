/**
 * ThreadRepository Class
 */
class CommentRepository {
  /**
   * Add New Comment
   * @param {*} _newComment NewComment Object
   */
  async addComment(_newComment) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Add New Reply
   * @param {*} _newReply NewReply Object
   */
  async addReply(_newReply) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * GetComment by Id
   * @param {string} _id Comment Id
   */
  async getCommentById(_id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get Comment by ThreadId
   * @param {string} _threadId thread id
   */
  async getCommentsByThreadId(_threadId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get replies
   * @param {string} _threadId threadId
   * @param {string} _commentId commentId
   * @return {*} All replies
   */
  async getReplies(_threadId, _commentId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * veryCommentExist by Id
   * @param {string} _id Comment Id
   */
  async verifyCommentExist(_id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * isAlreadyLiked by Id
   * @param {string} _id Comment Id
   * @param {string} _userId User Id
   */
  async isAlreadyLiked(_id, _userId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * unlikeComment by Id
   * @param {string} _id Comment Id
   * @param {string} _userId User Id
   */
  async unlikeComment(_id, _userId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * likeComment by Id
   * @param {string} _id Comment Id
   * @param {string} _userId User Id
   */
  async likeComment(_id, _userId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * countLikes by Id
   * @param {string} _id Comment Id
   */
  async countLikes(_id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Delete Comment by Id
   * @param {string} _id Id
   */
  async deleteComment(_id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
