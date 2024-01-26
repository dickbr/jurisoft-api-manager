const mongoose = require('mongoose');
const documentRouter = require('./src/routes/documents.route');
const userRouter = require('./src/routes/user.route');
const express = require(`express`);
const errorHandler = require('./src/middleware/error-handler.middleware');
require('dotenv/config')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express()

const PORT = 3006;
const MONGODB_URI = 'mongodb://localhost:27017/elegant_jepsen';

const swaggerConfig = require('./swagger');
const specs = swaggerJsdoc(swaggerConfig);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json())
app.use(documentRouter)
app.use(userRouter)
app.use(errorHandler)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
