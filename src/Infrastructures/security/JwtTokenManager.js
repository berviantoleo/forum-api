const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');

/**
 * JwtTokenManager
 */
class JwtTokenManager extends AuthenticationTokenManager {
  /**
   * JwtTokenManager constructor
   * @param {*} jwt Jwt Object
   */
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  /**
   * Create Access Token
   * @param {*} payload Request Payload
   * @return {*} Access Token
   */
  async createAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  /**
   * Create Refresh Token
   * @param {*} payload Request Payload
   * @return {*} Refresh Token
   */
  async createRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  /**
   * Verify Refresh Token
   * @param {*} token Refresh Token
   */
  async verifyRefreshToken(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  /**
   * Decode Token
   * @param {*} token Token
   * @return {*} Decoded Token
   */
  async decodePayload(token) {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
  }
}

module.exports = JwtTokenManager;
