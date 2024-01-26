const DeleteDocumentService = require('../src/services/document/delete.service')
const Document = require('../src/models/document.model');
const DocumentNotFoundException = require('../src/exceptions/document-found.exeception');

describe('DeleteDocumentService', () => {
  let service

  const documentId = 'some-id'

  beforeEach(() => {
    service = new DeleteDocumentService()
    Document.findByIdAndUpdate = jest.fn();
  })

  it.each([
    {
      should: 'deletar documento com sucesso',
      setup: () => {
        jest.spyOn(Document, 'findByIdAndUpdate').mockResolvedValueOnce({ id: 'some-id' })
      },
      expected: (result) => {
        expect(jest.spyOn(Document, 'findByIdAndUpdate')).toBeCalledWith(
          documentId, { $set: { deleted: true } }, { new: true }
        )
      }
    },
    {
      should: 'retornar DocumentNotFoundException',
      setup: () => {
        jest.spyOn(Document, 'findByIdAndUpdate').mockResolvedValueOnce(undefined)
      },
      expected: (result) => {
        expect(result).toBeInstanceOf(DocumentNotFoundException)
      }
    }
  ])('Deve $should', async ({ setup, expected }) => {
    if (setup) setup();
    await service.execute(documentId).then(expected).catch(expected);
  })
});
