const InvariantError = require('../../Commons/exceptions/InvariantError');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../Domains/users/UserRepository');

/**
 * UserRepositoryPostgres
 */
class UserRepositoryPostgres extends UserRepository {
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
   * Check username
   * @param {string} username Username
   */
  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('username tidak tersedia');
    }
  }

  /**
   * Add New User
   * @param {*} registerUser Register User Object
   * @return {*} Registered Object
   */
  async addUser(registerUser) {
    const {username, password, fullname} = registerUser;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({...result.rows[0]});
  }

  /**
   * Get Password by Username
   * @param {*} username Username
   * @return {*} Password
   */
  async getPasswordByUsername(username) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('username tidak ditemukan');
    }

    return result.rows[0].password;
  }

  /**
   * Get Id by Username
   * @param {string} username Username
   * @return {string} Id
   */
  async getIdByUsername(username) {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }

    const {id} = result.rows[0];

    return id;
  }
}

module.exports = UserRepositoryPostgres;
