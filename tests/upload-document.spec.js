const UploadDocumentService = require('../src/services/document/upload.service')
const JurisprevProvider = require('../src/providers/jurisprev.provider')
const Document = require('../src/models/document.model');

describe('UploadDocumentService', () => {
  let provider, service

  const input = {
    file: {
      originalName: 'some-name',
      path: 'some-path',
      mimetype: 'application/png'
    },
    email: 'some-email@test.com'
  }

  beforeEach(() => {
    provider = new JurisprevProvider()
    service = new UploadDocumentService(provider)
  })

  it.each([
    {
      should: 'criar documento com sucesso',
      input,
      setup: () => {
        jest.spyOn(require('../src/utils/extract-content'), 'getContent').mockResolvedValueOnce(['some-content'])
        jest.spyOn(provider, 'asignDocument').mockResolvedValue({})
        jest.spyOn(Document, 'create').mockResolvedValueOnce({ id: 'some-id' })
      },
      expected: (result) => {
        expect(result).toEqual({
          id: 'some-id',
          extractedText: []
        })
      }
    }
  ])('Deve $should', async ({ input, setup, expected }) => {
    if (setup) setup();
    await service.execute(input).then(expected).catch(expected);
  })
});
