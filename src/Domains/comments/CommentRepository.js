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
   * Delete Comment by Id
   * @param {string} id Id
   */
  async deleteComment(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
