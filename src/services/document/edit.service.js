const Document = require('../../models/document.model');
const { getContent } = require('../../utils/extract-content')
const DocumentNotFoundException = require('../../exceptions/document-found.exeception')

class EditService {
  async execute(documentId, { file }) {
    const document = await Document.findById(documentId);

    if (!document) {
      throw new DocumentNotFoundException()
    }

    const extractedText = await getContent(file);

    await Document.updateOne(
      { _id: documentId },
      {
        $set: {
          extractedText: extractedText
        },
        $push: {
          document: {
            ...file,
            createdAt: new Date(Date.now())
          }
        }
      }
    );
  }
};

module.exports = EditService;
