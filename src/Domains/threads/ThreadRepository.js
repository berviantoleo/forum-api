/**
 * ThreadRepository Class
 */
class ThreadRepository {
  /**
     * Add New Thread
     * @param {*} _newThread NewThread Object
     */
  async addThread(_newThread) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
     * Get Thread by Id
     * @param {string} _id Id
     */
  async getThreadById(_id) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Verify if thread exists
   * @param {string} _threadId Thread Id
   */
  async verifyThreadExist(_threadId) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadRepository;
