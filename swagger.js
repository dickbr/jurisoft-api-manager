const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Document API',
      version: '1.0.0',
      description: 'API para upload de documentos',
    },
    servers: [
      {
        url: 'http://localhost:3006',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = options;