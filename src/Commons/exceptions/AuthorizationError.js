const ClientError = require('./ClientError');
/**
 * AuthorizationError
 */
class AuthorizationError extends ClientError {
  /**
   * Constructor
   * @param {*} message Message
   */
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
