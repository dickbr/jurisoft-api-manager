const Document = require('../../models/document.model');
const DocumentNotFoundException = require('../../exceptions/document-found.exeception')

class DeleteService {
  async execute(documentId) {
    const document = await Document.findByIdAndUpdate(documentId, { $set: { deleted: true } }, { new: true });

    if (!document) {
      throw new DocumentNotFoundException();
    }
  }
};

module.exports = DeleteService;