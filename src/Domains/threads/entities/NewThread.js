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

    const {title, body} = payload;

    this.title = title;
    this.body = body;
  }

  /**
   * Verify Payload
   * @param {*} param0 Hapi Request Payload
   */
  _verifyPayload({title, body}) {
    if (!title || !body) {
      throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof title !== 'string' ||
      typeof body !== 'string'
    ) {
      throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (title.length > 512) {
      throw new Error('NEW_THREAD.TITLE_LIMIT_CHAR');
    }
  }
}

module.exports = NewThread;
