const { Router } = require("express");
const UserController = require(`../controllers/user.controller`);
const adminMiddleware = require("../middleware/admin.middleware");


const userRouter = Router()
const controller = new UserController()

userRouter.post(`/users`, adminMiddleware, controller.createUser);
userRouter.post(`/users/sign-in`, controller.authUser);

module.exports = userRouter;