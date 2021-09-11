/**
 * UserLogin Class
 */
class UserLogin {
  /**
   * UserLogin Constructor
   * @param {*} payload Hapi Request Payload
   */
  constructor(payload) {
    this._verifyPayload(payload);

    this.username = payload.username;
    this.password = payload.password;
  }

  /**
   * Verify Payload
   * @param {*} payload Hapi Request Payload
   */
  _verifyPayload(payload) {
    const {username, password} = payload;

    if (!username || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserLogin;
