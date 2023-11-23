import UserService from "../services/UserService";
import { Request, Response } from "express";

export default new (class UserController {
  ListUser(req: Request, res: Response): Promise<Response> {
    return UserService.ListUser(req, res);
  }

  RegisterUser(req: Request, res: Response): Promise<Response> {
    return UserService.RegisterUser(req, res);
  }

  LoginUser(req: Request, res: Response): Promise<Response> {
    return UserService.LoginUser(req, res);
  }
})();
