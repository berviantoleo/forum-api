const NewComment = require('../NewComment');

describe('a NewComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'new thread',
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrow(
        'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: {},
      threadId: 'randomthread',
      userId: 'randomly',
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrow(
        'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      content: 'New Comment',
      threadId: 'existingthread',
      userId: 'randomly',
    };

    // Action
    const newComment = new NewComment(payload);

    // Assert
    expect(newComment.content).toEqual(payload.content);
    expect(newComment.threadId).toEqual(payload.threadId);
    expect(newComment.userId).toEqual(payload.userId);
  });
});
