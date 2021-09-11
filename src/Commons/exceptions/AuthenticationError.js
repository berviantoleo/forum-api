const ClientError = require('./ClientError');

/**
 * AuthenticationError
 */
class AuthenticationError extends ClientError {
  /**
   * Constructor
   * @param {string} message Message
   */
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
