const multer = require('multer');

// Configuração do Multer para o armazenamento de arquivos
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // Verifica o tipo do arquivo
    if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      cb(null, true);
    } else {
      cb(new Error('Formato de arquivo não suportado'), false);
    }
  },
});

module.exports = upload;
