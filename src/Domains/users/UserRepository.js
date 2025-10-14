/**
 * UserRepository Class
 */
class UserRepository {
  /**
   * Add User
   * @param {*} _registerUser RegisterUser Object
   */
  async addUser(_registerUser) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Verify Available Username
   * @param {*} _username Username
   */
  async verifyAvailableUsername(_username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get Password by Username
   * @param {*} _username Username
   */
  async getPasswordByUsername(_username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get Id by Username
   * @param {*} _username Username
   */
  async getIdByUsername(_username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UserRepository;
