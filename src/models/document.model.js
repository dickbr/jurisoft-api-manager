const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  extractedText: {
    type: [String],
  },
  document: [
    {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number,
      createdAt: Date
    }
  ],
  deleted: Boolean
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;