const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');

/**
 * UsersHandler Class
 */
class UsersHandler {
  /**
   * UsersHandler Constructor
   * @param {*} container container
   */
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  /**
   * Create User Handler
   * @param {*} request Hapi Request
   * @param {*} h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
