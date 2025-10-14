/**
 * AuthenticationTokenManager
 */
class AuthenticationTokenManager {
  /**
   * Create Refresh Token
   * @param {*} _payload Payload
   */
  async createRefreshToken(_payload) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Create Access Token
   * @param {*} _payload Payload
   */
  async createAccessToken(_payload) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Verify Refresh Token
   * @param {*} _token Token
   */
  async verifyRefreshToken(_token) {
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
