const Document = require('../../models/document.model');

class ListService {
  async execute({ term, email, startDate, endDate, documentType }) {
    const documenst = await Document.aggregate([
      {
        $match: {
          $and: [
            email ? { email: { $regex: email, $options: 'i' } } : {},
            term ? { 'document.filename': { $regex: term, $options: 'i' } } : {},
            term ? { 'extractedText': { $elemMatch: { $regex: term, $options: 'i' } } } : {},
            startDate && endDate ? { 'document.createdAt': { $gte: new Date(startDate), $lt: new Date(endDate) } } : {},
            documentType ? { 'document.mimetype': { $regex: documentType, $options: 'i' } } : {},
            { deleted: { $in: [false, undefined] } }
          ]
        }
      },
      {
        $unwind: '$document'
      },
      {
        $sort: { 'document.createdAt': -1 }
      },
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          document: { $first: '$document' }
        }
      },
    ]);

    return documenst;
  }
};

module.exports = ListService;
