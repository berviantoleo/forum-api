/**
 * RegisterUser class
 */
class RegisterUser {
  /**
   * RegisterUser constructor
   * @param {*} payload Hapi Request Payload
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const {username, password, fullname} = payload;

    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  /**
   * Verify Payload
   * @param {*} param0 Hapi Request Payload
   */
  _verifyPayload({username, password, fullname}) {
    if (!username || !password || !fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }
  }
}

module.exports = RegisterUser;
