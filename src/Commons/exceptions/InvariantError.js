const ClientError = require('./ClientError');

/**
 * InvariantError
 */
class InvariantError extends ClientError {
  /**
   * Constructor
   * @param {string} message Error Message
   */
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
