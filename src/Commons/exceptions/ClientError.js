/**
 * ClientError
 */
class ClientError extends Error {
  /**
   * Constructor
   * @param {string} message Error Message
   * @param {number} statusCode Status Code
   */
  constructor(message, statusCode = 400) {
    super(message);

    if (this.constructor.name === 'ClientError') {
      throw new Error('cannot instantiate abstract class');
    }

    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
