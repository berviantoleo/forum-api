/**
 * UserRepository Class
 */
class UserRepository {
  /**
   * Add User
   * @param {*} registerUser RegisterUser Object
   */
  async addUser(registerUser) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Verify Available Username
   * @param {*} username Username
   */
  async verifyAvailableUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get Password by Username
   * @param {*} username Username
   */
  async getPasswordByUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get Id by Username
   * @param {*} username Username
   */
  async getIdByUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UserRepository;
