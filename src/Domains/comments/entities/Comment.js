/**
 * Comment class
 */
class Comment {
  /**
  * Comment constructor
  * @param {*} payload Hapi Request Payload
  */
  constructor(payload) {
    this._verifyPayload(payload);

    const {id, content, username, date, isdeleted, isReply} = payload;

    this.id = id;
    this.content = isdeleted ? (isReply ? '**balasan telah dihapus**' : '**komentar telah dihapus**') : content;
    this.username = username;
    this.date = date;
  }

  /**
  * Verify Payload
  * @param {*} param0 Hapi Request Payload
  */
  _verifyPayload({id, content, date, username, isdeleted, isReply}) {
    if (!id || !content || !username || !date ||
        (isdeleted === undefined || isdeleted === null) || (isReply === undefined || isReply === null)) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
            typeof content !== 'string' ||
            typeof username !== 'string' ||
            !(date instanceof Date) ||
            typeof isdeleted !== 'boolean' ||
            typeof isReply !== 'boolean'
    ) {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Comment;
