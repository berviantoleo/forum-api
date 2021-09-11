const ClientError = require('./ClientError');

/**
 * NotFoundError class
 */
class NotFoundError extends ClientError {
  /**
   * Constructor
   * @param {*} message Error Message
   */
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
