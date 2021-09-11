const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthenticationRepository = require('../../Domains/authentications/AuthenticationRepository');

/**
 * AuthRepoPostgres
 */
class AuthenticationRepositoryPostgres extends AuthenticationRepository {
  /**
   * Constructor
   * @param {*} pool Pool object
   */
  constructor(pool) {
    super();
    this._pool = pool;
  }

  /**
   * Add New Token
   * @param {BigIntToLocaleStringOptions} token token
   */
  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    };

    await this._pool.query(query);
  }

  /**
   * Check Token
   * @param {string} token Token
   */
  async checkAvailabilityToken(token) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }
  }

  /**
   * Delete existing token
   * @param {*} token Token
   */
  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationRepositoryPostgres;
