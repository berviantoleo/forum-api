/**
 * NewThread class
 */
class NewThread {
  /**
   * NewThread constructor
   * @param {*} payload Hapi Request Payload
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const {title, body, userId} = payload;

    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  /**
   * Verify Payload
   * @param {*} param0 Hapi Request Payload
   */
  _verifyPayload({title, body, userId}) {
    if (!title || !body || !userId) {
      throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof title !== 'string' ||
      typeof body !== 'string' ||
      typeof userId !== 'string'
    ) {
      throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (title.length > 512) {
      throw new Error('NEW_THREAD.TITLE_LIMIT_CHAR');
    }
  }
}

module.exports = NewThread;
