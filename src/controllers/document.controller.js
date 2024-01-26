const UploadService = require("../services/document/upload.service");
const DeleteService = require("../services/document/delete.service");
const EditService = require("../services/document/edit.service");
const ListService = require("../services/document/list.service");
const JurisprevProvider = require("../providers/jurisprev.provider");


const jurisprevProvider = new JurisprevProvider()
const uploadService = new UploadService(jurisprevProvider)
const deleteService = new DeleteService();
const editService = new EditService()
const listService = new ListService()

class DocumentController {

  async uploadDocument(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ mensagem: 'Nenhum arquivo enviado.' });
      }

      const uploadResult = await uploadService.execute({
        file: req.file,
        email: req.user.email
      });

      res.status(201).json({ mensagem: 'Upload de documento concluído com sucesso', resultado: uploadResult });
    } catch (error) {
      next(error);
    }
  }

  async deleteDocument(req, res, next) {
    try {
      const documentId = req.params.id;

      if (!documentId) {
        return res.status(400).json({ mensagem: 'ID do documento é obrigatório.' });
      }

      await deleteService.execute(documentId);

      res.status(200).json({ mensagem: 'Exclusão segura de documento concluída com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async updateDocument(req, res, next) {
    try {
      const documentId = req.params.id;

      await editService.execute(documentId, {
        file: req.file
      });

      res.status(200).json({ mensagem: 'Atualização de documento concluída com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async searchDocuments(req, res, next) {
    try {
      const query = req.query;
      const role = req.user.role;
      const documents = await listService.execute({
        ...query,
        email: role === 'user' ? req.user.email : req.query.email
      });

      res.status(200).json({ documents });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DocumentController;