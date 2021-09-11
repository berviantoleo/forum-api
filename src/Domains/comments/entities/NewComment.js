/**
 * NewComment class
 */
class NewComment {
  /**
     * NewComment constructor
     * @param {*} payload Hapi Request Payload
     */
  constructor(payload) {
    this._verifyPayload(payload);

    const {content, threadId, userId} = payload;

    this.content = content;
    this.threadId = threadId;
    this.userId = userId;
  }

  /**
     * Verify Payload
     * @param {*} param0 Hapi Request Payload
     */
  _verifyPayload({content, threadId, userId}) {
    if (!content || !threadId || !userId) {
      throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof content !== 'string' ||
        typeof threadId !== 'string' ||
        typeof userId !== 'string'
    ) {
      throw new Error('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewComment;
