import UserController from "../controllers/UserController";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/list-user", UserController.ListUser);
userRouter.post("/register", UserController.RegisterUser);
userRouter.post("/login", UserController.LoginUser);

export default userRouter;
