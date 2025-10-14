const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadByIdUseCase = require('../../../../Applications/use_case/GetThreadByIdUseCase');

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
    this.getThreadbyIdHandler = this.getThreadbyIdHandler.bind(this);
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

  /**
   * Get Thread by Id Handler
   * @param {*} request Hapi Request
   * @param {*} _h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async getThreadbyIdHandler(request, _h) {
    const {threadId} = request.params;
    const getThreadByIdUseCase = this._container.getInstance(GetThreadByIdUseCase.name);
    const thread = await getThreadByIdUseCase.execute({threadId});

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }
}

module.exports = ThreadsHandler;
