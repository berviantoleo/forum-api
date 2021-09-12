const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const CreatedComment = require('../../Domains/comments/entities/CreatedComment');

/**
 * AuthRepoPostgres
 */
class CommentRepositoryPostgres extends CommentRepository {
  /**
   * Constructor
   * @param {*} pool Pool Object
   * @param {*} idGenerator IdGenerator Object
   */
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * Add New Comment
   * @param {*} newComment NewComment Object
   */
  async addComment(newComment) {
    const {content, threadId, userId} = newComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: `INSERT INTO comments (id, content, thread_id, owner_id)
            VALUES($1, $2, $3, $4)
            RETURNING id, content, owner_id as owner`,
      values: [id, content, threadId, userId],
    };

    const result = await this._pool.query(query);

    return new CreatedComment({...result.rows[0]});
  }

  /**
   * Delete Comment by Id
   * @param {string} id Id
   */
  async deleteComment(id) {
    const query = {
      text: `UPDATE comments
            SET is_delete = true
            WHERE is_delete = false AND id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }
  }
}

module.exports = CommentRepositoryPostgres;
