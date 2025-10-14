/**
 * PasswordHas
 */
class PasswordHash {
  /**
   * Hashing
   * @param {string} _password Password
   */
  async hash(_password) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Compare Password
   * @param {string} _plain Plain Password
   * @param {string} _encrypted Encrypted Password
   */
  async comparePassword(_plain, _encrypted) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
