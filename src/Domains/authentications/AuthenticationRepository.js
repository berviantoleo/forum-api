/**
 * Auth Repository
 */
class AuthenticationRepository {
  /**
   * Add New Token to database
   * @param {*} _token auth token
   */
  async addToken(_token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Check auth token
   * @param {*} _token Token
   */
  async checkAvailabilityToken(_token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Delete token
   * @param {*} _token token
   */
  async deleteToken(_token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthenticationRepository;
