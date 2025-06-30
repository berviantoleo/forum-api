const Comment = require('../Comment');

describe('a Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'new thread',
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrow(
        'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'random-id',
      content: {},
      isdeleted: false,
      date: new Date(),
      isReply: false,
      username: 'randomthread',
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrow(
        'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create comment object correctly without sensor', () => {
    // Arrange
    const payload = {
      id: 'thread-1234',
      content: 'New Comment',
      username: 'user-1234',
      date: new Date(),
      isdeleted: false,
      isReply: false,
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.username).toEqual(payload.username);
    expect(comment.content).toEqual(payload.content);
    expect(comment.date).toEqual(payload.date);
    expect(comment).not.toHaveProperty('isdeleted');
    expect(comment).not.toHaveProperty('isReply');
  });

  it('should create comment object correctly with sensor', () => {
    // Arrange
    const payload = {
      id: 'thread-1234',
      content: 'New Comment',
      username: 'user-1234',
      date: new Date(),
      isdeleted: true,
      isReply: false,
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual('**komentar telah dihapus**');
    expect(comment.username).toEqual(payload.username);
    expect(comment.date).toEqual(payload.date);
    expect(comment).not.toHaveProperty('isdeleted');
    expect(comment).not.toHaveProperty('isReply');
  });

  it('should create comment object correctly with sensor for reply', () => {
    // Arrange
    const payload = {
      id: 'thread-1234',
      content: 'New Reply',
      username: 'user-1234',
      date: new Date(),
      isdeleted: true,
      isReply: true,
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual('**balasan telah dihapus**');
    expect(comment.username).toEqual(payload.username);
    expect(comment.date).toEqual(payload.date);
    expect(comment).not.toHaveProperty('isdeleted');
    expect(comment).not.toHaveProperty('isReply');
  });
});
