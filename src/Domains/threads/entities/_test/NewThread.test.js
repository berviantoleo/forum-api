const NewThread = require('../NewThread');

describe('a NewThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'new thread',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow(
        'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 'new thread',
      body: {},
      userId: 'randomly',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow(
        'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should throw error when title very long, more than 512', () => {
    // Arrange
    let myTitle = 'New Thread Title';
    for (let i = 0; i < 520; i++) {
      myTitle += '?';
    }
    const payload = {
      title: myTitle,
      body: 'Good body',
      userId: 'random-user',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow(
        'NEW_THREAD.TITLE_LIMIT_CHAR',
    );
  });

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'New Thread',
      body: 'Hello, this is new body for meeeee........................',
      userId: 'randomly',
    };

    // Action
    const newThread = new NewThread(payload);

    // Assert
    expect(newThread.title).toEqual(payload.title);
    expect(newThread.body).toEqual(payload.body);
    expect(newThread.userId).toEqual(payload.userId);
  });
});
