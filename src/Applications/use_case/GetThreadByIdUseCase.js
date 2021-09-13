/**
 * GetThreadByIdUseCase
 */
class GetThreadByIdUseCase {
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
    const {threadId} = useCasePayload;
    return this._threadRepository.getThreadById(threadId);
  }
}

module.exports = GetThreadByIdUseCase;
