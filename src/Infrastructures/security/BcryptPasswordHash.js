const EncryptionHelper = require('../../Applications/security/PasswordHash');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

/**
 * BcryptPasswordHash
 */
class BcryptPasswordHash extends EncryptionHelper {
  /**
   * Constructor
   * @param {*} bcrypt Bcypt Object
   * @param {*} saltRound Salt Round
   */
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  /**
   * Hash Password
   * @param {string} password Plain Password
   * @return {string} Hashed Password
   */
  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  /**
   * Comparing Password
   * @param {string} password Plain Password
   * @param {string} hashedPassword Hashed Password
   */
  async comparePassword(password, hashedPassword) {
    const result = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError('kredensial yang Anda masukkan salah');
    }
  }
}

module.exports = BcryptPasswordHash;
