const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const LikeCommentUseCase = require('../../../../Applications/use_case/LikeCommentUseCase');

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
    this.likeCommentHandler = this.likeCommentHandler.bind(this);
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
   * @param {*} _h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async deleteCommentHandler(request, _h) {
    const {id: userId} = request.auth.credentials;
    const {threadId, commentId} = request.params;
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const deletePayload = {userId, threadId, commentId};
    await deleteCommentUseCase.execute(deletePayload);

    return {
      status: 'success',
    };
  }

  /**
   * Like Comment Handler
   * @param {*} request Hapi Request
   * @param {*} _h Hapi Response Toolkit
   * @return {*} Hapi Response
   */
  async likeCommentHandler(request, _h) {
    const {id: userId} = request.auth.credentials;
    const {threadId, commentId} = request.params;
    const likeCommentUseCase = this._container.getInstance(LikeCommentUseCase.name);
    const likePayload = {userId, threadId, commentId};
    await likeCommentUseCase.execute(likePayload);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentsHandler;
