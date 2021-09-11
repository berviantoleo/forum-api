/**
 * PasswordHas
 */
class PasswordHash {
  /**
   * Hashing
   * @param {string} password Password
   */
  async hash(password) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Compare Password
   * @param {string} plain Plain Password
   * @param {string} encrypted Encrypted Password
   */
  async comparePassword(plain, encrypted) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
