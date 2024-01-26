const { Router } = require("express");
const DocumentController = require(`../controllers/document.controller`)
const upload = require('../storage/multer');
const userMiddleware = require("../middleware/user.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const authMiddleware = require("../middleware/auth.middleware");


const documentRouter = Router()
const controller = new DocumentController()

/**
 * @swagger
 * /documents/uploads:
 *   post:
 *     summary: Endpoint para fazer upload de um documento
 *     description: Faz o upload de um documento para o servidor.
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Upload do documento realizado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '500':
 *         description: Erro interno do servidor
 */
documentRouter.post(`/documents/uploads`, authMiddleware, userMiddleware, upload.single('file'), controller.uploadDocument);

/**
 * @swagger
 * /documents/uploads/{id}:
 *   put:
 *     summary: Atualiza um documento existente
 *     description: Atualiza um documento existente com o ID fornecido.
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Documento atualizado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Documento não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
documentRouter.put(`/documents/uploads/:id`, authMiddleware, userMiddleware, upload.single('file'), controller.updateDocument);

/**
 * @swagger
 * /documents/uploads/{id}:
 *   delete:
 *     summary: Deleta um documento existente
 *     description: Deleta um documento existente com o ID fornecido.
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Documento deletado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Documento não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
documentRouter.delete(`/documents/uploads/:id`, authMiddleware, userMiddleware, controller.deleteDocument);

/**
 * @swagger
 * /documents/uploads:
 *   get:
 *     summary: Lista todos os documentos
 *     description: Retorna uma lista de todos os documentos.
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de documentos retornada com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '500':
 *         description: Erro interno do servidor
 */
documentRouter.get(`/documents/uploads`, authMiddleware, userMiddleware, controller.searchDocuments);

module.exports = documentRouter;
