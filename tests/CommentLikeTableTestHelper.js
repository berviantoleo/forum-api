/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentLikeTableTestHelper = {
  async addLike({
    commentId = 'comment-123', userId = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2) RETURNING id',
      values: [commentId, userId],
    };

    await pool.query(query);
  },

  async findLikes({
    commentId = 'comment-123', userId = 'user-123',
  }) {
    const query = {
      text: `SELECT id, comment_id as "commentId", user_id as "userId"
            FROM comment_likes WHERE comment_id = $1 AND user_id = $2`,
      values: [commentId, userId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comment_likes WHERE 1=1');
  },
};

module.exports = CommentLikeTableTestHelper;
