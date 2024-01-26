

class DocumentNotFoundException extends Error {

  code = 404;

  constructor() {
    super('Documento não encontrado')
  }
}

module.exports = DocumentNotFoundException;