const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

/**
 * CommentsHandler Class
 */
class CommentsHandler {
  /**
   * CommentsHandler Constructor
   * @param {*} container container
   */
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  /**
   * Create Comment Handler
   * @param {*} request Hapi Request
   * @param {*} h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async postCommentHandler(request, h) {
    const {id: userId} = request.auth.credentials;
    const {threadId} = request.params;
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const newPayload = Object.assign(request.payload, {userId, threadId});
    const addedComment = await addCommentUseCase.execute(newPayload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Delete Comment Handler
   * @param {*} request Hapi Request
   * @param {*} h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async deleteCommentHandler(request, h) {
    const {id: userId} = request.auth.credentials;
    const {threadId, commentId} = request.params;
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const deletePayload = {userId, threadId, commentId};
    await deleteCommentUseCase.execute(deletePayload);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentsHandler;
