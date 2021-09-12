const NewThread = require('../../Domains/threads/entities/NewThread');

/**
 * AddUserUseCase
 */
class AddThreadUseCase {
  /**
   * Constructor
   * @param {*} param0 DI
   */
  constructor({threadRepository}) {
    this._threadRepository = threadRepository;
  }

  /**
   * Execute
   * @param {*} useCasePayload UseCase
   * @return {*} User
   */
  async execute(useCasePayload) {
    const newThread = new NewThread(useCasePayload);
    return this._threadRepository.addThread(newThread);
  }
}

module.exports = AddThreadUseCase;
