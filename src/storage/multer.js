const multer = require('multer');

const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ' | ' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit to 5MB
  },
  fileFilter: function (req, file, cb) {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only PDF, DOCX and image files are allowed!'))
    }
  }
});

module.exports = upload;