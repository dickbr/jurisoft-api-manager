const ListDocumentService = require('../src/services/document/list.service')
const Document = require('../src/models/document.model');
const DocumentNotFoundException = require('../src/exceptions/document-found.exeception');

describe('ListDocumentService', () => {
  let service;

  beforeEach(() => {
    service = new ListDocumentService()
    Date.now = jest.fn(() => new Date(2020, 1, 1))
    Document.aggregate = jest.fn();
  })

  const input = {
    email: 'some-email',
    term: 'some-term',
    startDate: '2020-01-01',
    endDate: '2020-01-01',
    documentType: 'some-type'
  }

  it.each([
    {
      should: 'listar documentos com filtros com sucesso',
      input,
      setup: () => {
        jest.spyOn(Document, 'aggregate').mockResolvedValueOnce([
          { id: 'some-id' }
        ])
      },
      expected: (result) => {
        expect(jest.spyOn(Document, 'aggregate')).toBeCalledWith([
          {
            $match: {
              $and: [
                { email: { $regex: input.email, $options: 'i' } },
                { 'document.filename': { $regex: input.term, $options: 'i' } },
                { 'extractedText': { $elemMatch: { $regex: input.term, $options: 'i' } } },
                { 'document.createdAt': { $gte: new Date(input.startDate), $lt: new Date(input.endDate) } },
                { 'document.mimetype': { $regex: input.documentType, $options: 'i' } },
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
        ])
        expect(result).toEqual([
          { id: 'some-id' }
        ])
      }
    },
    {
      should: 'listar documentos sem filtros com sucesso',
      input: {},
      setup: () => {
        jest.spyOn(Document, 'aggregate').mockResolvedValueOnce([
          { id: 'some-id' }
        ])
      },
      expected: (result) => {
        expect(jest.spyOn(Document, 'aggregate')).toBeCalledWith([
          {
            $match: {
              $and: [
                {},
                {},
                {},
                {},
                {},
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
        ])
        expect(result).toEqual([
          { id: 'some-id' }
        ])
      }
    }
  ])('Deve $should', async ({ input, setup, expected }) => {
    if (setup) setup();
    await service.execute(input).then(expected).catch(expected);
  })
});
