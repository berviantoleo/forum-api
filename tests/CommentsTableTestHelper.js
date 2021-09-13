/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123', content = 'Super Comment', threadId = 'thread-99999', userId = 'user-999999',
    isDeleted = false,
  }) {
    const query = {
      text: 'INSERT INTO comments (id, content, thread_Id, owner_id, is_delete) VALUES($1, $2, $3, $4, $5)',
      values: [id, content, threadId, userId, isDeleted],
    };

    await pool.query(query);
  },

  async addReply({
    id = 'reply-123', content = 'Super Comment', threadId = 'thread-99999', userId = 'user-999999',
    isDeleted = false, commentId = 'comment-1234',
  }) {
    const query = {
      text: 'INSERT INTO comments (id, content, thread_Id, owner_id, reply_to, is_delete) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, threadId, userId, commentId, isDeleted],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;
