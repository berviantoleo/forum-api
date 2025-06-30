const CreatedComment = require('../CreatedComment');

describe('a CreatedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'new thread',
    };

    // Action and Assert
    expect(() => new CreatedComment(payload)).toThrow(
        'CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'random-id',
      content: {},
      owner: 'randomthread',
    };

    // Action and Assert
    expect(() => new CreatedComment(payload)).toThrow(
        'CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-1234',
      content: 'New Comment',
      owner: 'user-1234',
    };

    // Action
    const newComment = new CreatedComment(payload);

    // Assert
    expect(newComment.id).toEqual(payload.id);
    expect(newComment.content).toEqual(payload.content);
    expect(newComment.owner).toEqual(payload.owner);
  });
});
