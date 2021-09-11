/**
 * CreatedThread Model
 */
class CreatedThread {
  /**
     * Constructor for RegisteredUser
     * @param {*} payload Hapi Request Payload
     */
  constructor(payload) {
    this._verifyPayload(payload);

    const {id, title, owner} = payload;

    this.id = id;
    this.title = title;
    this.owner = owner;
  }

  /**
     * Verify the payload
     * @param {*} param0 RegisteredUser payload
     */
  _verifyPayload({id, title, owner}) {
    if (!id || !title || !owner) {
      throw new Error('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' ||
        typeof title !== 'string' ||
        typeof owner !== 'string') {
      throw new Error('CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = CreatedThread;
