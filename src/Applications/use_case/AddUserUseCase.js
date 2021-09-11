const RegisterUser = require('../../Domains/users/entities/RegisterUser');

/**
 * AddUserUseCase
 */
class AddUserUseCase {
  /**
   * Constructor
   * @param {*} param0 DI
   */
  constructor({userRepository, passwordHash}) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  /**
   * Execute
   * @param {*} useCasePayload UseCase
   * @return {*} User
   */
  async execute(useCasePayload) {
    const registerUser = new RegisterUser(useCasePayload);
    await this._userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this._passwordHash.hash(registerUser.password);
    return this._userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;
