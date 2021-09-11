/**
 * RegisteredUser Model
 */
class RegisteredUser {
  /**
   * Constructor for RegisteredUser
   * @param {*} payload Hapi Request Payload
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const {id, username, fullname} = payload;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  /**
   * Verify the payload
   * @param {*} param0 RegisteredUser payload
   */
  _verifyPayload({id, username, fullname}) {
    if (!id || !username || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' ||
      typeof username !== 'string' ||
      typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
