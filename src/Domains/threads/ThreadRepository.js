/**
 * ThreadRepository Class
 */
class ThreadRepository {
  /**
     * Add New Thread
     * @param {*} newThread NewThread Object
     */
  async addThread(newThread) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
     * Get Thread by Id
     * @param {string} id Id
     */
  async getThreadById(id) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Verify if thread exists
   * @param {string} threadId Thread Id
   */
  async verifyThreadExist(threadId) {
    throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadRepository;
