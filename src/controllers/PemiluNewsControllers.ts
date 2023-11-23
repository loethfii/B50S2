import PemiluNewsServices from "../services/PemiluNewsServices";
import { Request, Response } from "express";

export default new (class PemiluNewsControllers {
  //   private readonly pemiluNewsServices: PemiluNewsServices;
  FindAll(req: Request, res: Response): Promise<Response> {
    return PemiluNewsServices.FindAll(req, res);
  }

  FindOne(req: Request, res: Response): Promise<Response> {
    return PemiluNewsServices.FindOne(req, res);
  }

  AddPemiluNews(req: Request, res: Response): Promise<Response> {
    return PemiluNewsServices.Create(req, res);
  }

  UpdatePemiluNews(req: Request, res: Response): Promise<Response> {
    return PemiluNewsServices.Update(req, res);
  }

  DeletePemiluNews(req: Request, res: Response): Promise<Response> {
    return PemiluNewsServices.Delete(req, res);
  }
})();
