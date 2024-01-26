

class UnauthorizedException extends Error {

  code = 401;

  constructor() {
    super('Não autorizado')
  }
}

module.exports = UnauthorizedException;