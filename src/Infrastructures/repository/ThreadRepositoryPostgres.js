const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const CreatedThread = require('../../Domains/threads/entities/CreatedThread');

/**
 * AuthRepoPostgres
 */
class ThreadRepositoryPostgres extends ThreadRepository {
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
   * Add New Thread
   * @param {*} newThread NewThread Object
   */
  async addThread(newThread) {
    const {title, body, userId} = newThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads (id, title, body, owner_id) VALUES($1, $2, $3, $4) RETURNING id, title, owner_id as owner',
      values: [id, title, body, userId],
    };

    const result = await this._pool.query(query);

    return new CreatedThread({...result.rows[0]});
  }

  /**
   * Get Thread by Id
   * @param {string} id Id
   * @return {*} Thread data
   */
  async getThreadById(id) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username 
                FROM threads
                JOIN users ON threads.owner_id = users.id
                WHERE threads.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return result.rows[0];
  }

  /**
   * Verify thread exists
   * @param {string} threadId ThreadId
   */
  async verifyThreadExist(threadId) {
    const query = {
      text: `SELECT id 
                FROM threads
                WHERE id = $1`,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }
  }
}

module.exports = ThreadRepositoryPostgres;
