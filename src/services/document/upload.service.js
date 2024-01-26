const Document = require("../../models/document.model");
const { getContent } = require('../../utils/extract-content')

class UploadService {
  jurisprevProvider = { asignDocument: async (input) => { } }

  constructor(jurisprevProvider) {
    this.jurisprevProvider = jurisprevProvider;
  }

  async execute({ file, email }) {
    const extractedText = await getContent(file);
    const result = await Document.create({
      email,
      extractedText,
      document: [
        {
          ...file,
          createdAt: new Date(Date.now())
        }
      ]
    })
    result.extractedText = [];

    await this.jurisprevProvider.asignDocument(file)

    return result
  }
};

module.exports = UploadService;
