
class UserNotFoundException extends Error {

  code = 404;

  constructor() {
    super('Usuário não encontrado')
  }
}

module.exports = UserNotFoundException;