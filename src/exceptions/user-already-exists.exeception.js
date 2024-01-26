
class UserAlreadyExistsException extends Error {

  code = 409;

  constructor() {
    super('Usuário já existe')
  }
}

module.exports = UserAlreadyExistsException;