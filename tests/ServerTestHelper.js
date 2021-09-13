const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');

const ServerTestHelper = {
  async getAccessToken(userId = 'user-99999999', username = 'bervberv') {
    const payloadUser = {
      id: userId,
      username: username,
      password: 'supersecret',
      fullname: 'Never Tell My Name',
    };
    await UsersTableTestHelper.addUser(payloadUser);
    return Jwt.token.generate(payloadUser, process.env.ACCESS_TOKEN_KEY);
  },
};

module.exports = ServerTestHelper;
