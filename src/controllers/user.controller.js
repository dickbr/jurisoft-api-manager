const CreateUserService = require("../services/user/create-user.service");
const AuthUserService = require("../services/user/auth-user.service");

const createUserService = new CreateUserService()
const authUserService = new AuthUserService()

class UserController {
  async createUser(req, res, next) {
    try {
      await createUserService.execute({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async authUser(req, res, next) {
    try {
      const result = await authUserService.execute({
        email: req.body.email,
        password: req.body.password,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;