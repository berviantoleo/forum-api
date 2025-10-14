const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');


/**
 * RepliesHandler Class
 */
class RepliesHandler {
  /**
   * RepliesHandler Constructor
   * @param {*} container container
   */
  constructor(container) {
    this._container = container;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  /**
   * Create Reply Handler
   * @param {*} request Hapi Request
   * @param {*} h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async postReplyHandler(request, h) {
    const {id: userId} = request.auth.credentials;
    const {threadId, commentId} = request.params;
    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    const newPayload = Object.assign(request.payload, {userId, threadId, commentId});
    const addedReply = await addReplyUseCase.execute(newPayload);

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Delete Reply Handler
   * @param {*} request Hapi Request
   * @param {*} _h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async deleteReplyHandler(request, _h) {
    const {id: userId} = request.auth.credentials;
    const {threadId, commentId, replyId} = request.params;
    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
    const deletePayload = {userId, threadId, commentId, replyId};
    await deleteReplyUseCase.execute(deletePayload);

    return {
      status: 'success',
    };
  }
}

module.exports = RepliesHandler;
