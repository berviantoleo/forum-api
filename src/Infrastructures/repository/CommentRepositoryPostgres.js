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
   * Add New Reply
   * @param {*} newReply NewReply Object
   */
  async addReply(newReply) {
    const {content, threadId, commentId, userId} = newReply;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: `INSERT INTO comments (id, content, thread_id, reply_to, owner_id)
            VALUES($1, $2, $3, $4, $5)
            RETURNING id, content, owner_id as owner`,
      values: [id, content, threadId, commentId, userId],
    };

    const result = await this._pool.query(query);

    return new CreatedComment({...result.rows[0]});
  }

  /**
   * GetComment by Id
   * @param {string} id Comment Id
   */
  async getCommentById(id) {
    const query = {
      text: `SELECT id, owner_id as owner FROM comments
            WHERE is_delete = false AND id = $1
            FETCH FIRST ROW ONLY`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }

    return result.rows[0];
  }

  /**
   * Get Comment by ThreadId
   * @param {string} threadId thread id
   * @return {*} Get comments
   */
  async getCommentsByThreadId(threadId) {
    const queryComments = {
      text: `SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete as isdeleted
              FROM comments
              JOIN users ON comments.owner_id = users.id
              WHERE thread_id = $1 AND reply_to IS NULL
              ORDER BY comments.date`,
      values: [threadId],
    };
    const resultComments = await this._pool.query(queryComments);
    return resultComments.rows;
  }

  /**
   * Get replies
   * @param {string} threadId threadId
   * @param {string} commentId commentId
   * @return {*} All replies
   */
  async getReplies(threadId, commentId) {
    const queryReplies = {
      text: `SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete as isdeleted
              FROM comments
              JOIN users ON comments.owner_id = users.id
              WHERE thread_id = $1 AND reply_to = $2
              ORDER BY comments.date`,
      values: [threadId, commentId],
    };
    const resultReplies = await this._pool.query(queryReplies);
    return resultReplies.rows;
  }

  /**
   * verifyCommentExist by Id
   * @param {string} id Comment Id
   */
  async verifyCommentExist(id) {
    const query = {
      text: `SELECT id FROM comments
            WHERE is_delete = false AND id = $1
            FETCH FIRST ROW ONLY`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }
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

  /**
   * isAlreadyLiked by Id
   * @param {string} id Comment Id
   * @param {string} userId User Id
   */
  async isAlreadyLiked(id, userId) {
    const query = {
      text: `SELECT id FROM comment_likes
            WHERE comment_id = $1 AND user_id = $2`,
      values: [id, userId],
    };

    const result = await this._pool.query(query);

    return !!result.rowCount;
  }

  /**
   * unlikeComment by Id
   * @param {string} id Comment Id
   * @param {string} userId User Id
   */
  async unlikeComment(id, userId) {
    const query = {
      text: `DELETE FROM comment_likes
            WHERE comment_id = $1 AND user_id = $2`,
      values: [id, userId],
    };

    await this._pool.query(query);
  }

  /**
   * likeComment by Id
   * @param {string} id Comment Id
   * @param {string} userId User Id
   */
  async likeComment(id, userId) {
    const query = {
      text: `INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2) RETURNING id`,
      values: [id, userId],
    };

    await this._pool.query(query);
  }

  /**
   * countLikes by Id
   * @param {string} id Comment Id
   */
  async countLikes(id) {
    const query = {
      text: `SELECT COUNT(*) as total FROM comment_likes
            WHERE comment_id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    return parseInt(result.rows[0].total);
  }
}

module.exports = CommentRepositoryPostgres;
