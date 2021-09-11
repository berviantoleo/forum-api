/**
 * RefresgAuthenticationUseCase
 */
class RefreshAuthenticationUseCase {
  /**
   * Constructor
   * @param {*} param0 DI
   */
  constructor({
    authenticationRepository,
    authenticationTokenManager,
  }) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  /**
   * Execute
   * @param {*} useCasePayload Payload
   * @return {string} Access Token
   */
  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);
    const {refreshToken} = useCasePayload;

    await this._authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);

    const {username, id} = await this._authenticationTokenManager.decodePayload(refreshToken);

    return this._authenticationTokenManager.createAccessToken({username, id});
  }

  /**
   * Verify Payload
   * @param {*} payload Payload
   */
  _verifyPayload(payload) {
    const {refreshToken} = payload;

    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
