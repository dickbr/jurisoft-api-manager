const EditDocumentService = require('../src/services/document/edit.service')
const Document = require('../src/models/document.model');
const DocumentNotFoundException = require('../src/exceptions/document-found.exeception');

describe('UploadDocumentService', () => {
  let service

  const documentId = 'some-id'

  const file = {
    originalName: 'some-name',
    path: 'some-path',
    mimetype: 'application/png'
  }

  const extractedText = undefined;

  beforeEach(() => {
    service = new EditDocumentService()
    Date.now = jest.fn(() => new Date(2020, 1, 1))
    Document.findById = jest.fn();
    Document.updateOne = jest.fn()
  })

  it.each([
    {
      should: 'editar documento com sucesso',
      setup: () => {
        jest.spyOn(require('../src/utils/extract-content'), 'getContent').mockResolvedValueOnce(extractedText)
        jest.spyOn(Document, 'findById').mockResolvedValueOnce({ id: 'some-id' })
      },
      expected: (result) => {
        expect(jest.spyOn(Document, 'updateOne')).toBeCalledWith(
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
        )
      }
    },
    {
      should: 'retornar DocumentNotFoundException',
      setup: () => {
        jest.spyOn(Document, 'findById').mockResolvedValueOnce(undefined)
      },
      expected: (result) => {
        expect(result).toBeInstanceOf(DocumentNotFoundException)
      }
    }
  ])('Deve $should', async ({ input, setup, expected }) => {
    if (setup) setup();
    await service.execute(documentId, { file }).then(expected).catch(expected);
  })
});
