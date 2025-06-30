const NewReply = require('../NewReply');

describe('a NewReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'new reply',
    };

    // Action and Assert
    expect(() => new NewReply(payload)).toThrow(
        'NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: {},
      threadId: 'randomthread',
      commentId: 'randomcomment',
      userId: 'randomly',
    };

    // Action and Assert
    expect(() => new NewReply(payload)).toThrow(
        'NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create newReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'New Comment',
      threadId: 'existingthread',
      commentId: 'randomcomment',
      userId: 'randomly',
    };

    // Action
    const newReply = new NewReply(payload);

    // Assert
    expect(newReply.content).toEqual(payload.content);
    expect(newReply.threadId).toEqual(payload.threadId);
    expect(newReply.commentId).toEqual(payload.commentId);
    expect(newReply.userId).toEqual(payload.userId);
  });
});
