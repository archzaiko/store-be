const Model = require('./model');

function Auth () {
  const model = new Model();

  this.login = (username, password) => {
    const user = model.findByName(username);
    if (user) {
      return user.password === password;
    }
    throw({
      statusCode: 404,
      message: 'incorrect login data'
    });
  }
}

module.exports = Auth;
