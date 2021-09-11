/**
 * Auth Repository
 */
class AuthenticationRepository {
  /**
   * Add New Token to database
   * @param {*} token auth token
   */
  async addToken(token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Check auth token
   * @param {*} token Token
   */
  async checkAvailabilityToken(token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Delete token
   * @param {*} token token
   */
  async deleteToken(token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthenticationRepository;
