const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');

/**
 * ThreadsHandler Class
 */
class ThreadsHandler {
  /**
   * ThreadsHandler Constructor
   * @param {*} container container
   */
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  /**
   * Create Thread Handler
   * @param {*} request Hapi Request
   * @param {*} h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async postThreadHandler(request, h) {
    const {id: userId} = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const newPayload = Object.assign(request.payload, {userId});
    const addedThread = await addThreadUseCase.execute(newPayload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
