/**
 * AuthenticationTokenManager
 */
class AuthenticationTokenManager {
  /**
   * Create Refresh Token
   * @param {*} payload Payload
   */
  async createRefreshToken(payload) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Create Access Token
   * @param {*} payload Payload
   */
  async createAccessToken(payload) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Verify Refresh Token
   * @param {*} token Token
   */
  async verifyRefreshToken(token) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Decode Payload
   */
  async decodePayload() {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthenticationTokenManager;
