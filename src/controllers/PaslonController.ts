import PaslonServices from "../services/PaslonServices";
import { Request, Response } from "express";

export default new (class PaslonController {
  FindAll(req: Request, res: Response): Promise<Response> {
    return PaslonServices.FindAll(req, res);
  }

  FindOne(req: Request, res: Response): Promise<Response> {
    return PaslonServices.FindOne(req, res);
  }
  AddPaslon(req: Request, res: Response): Promise<Response> {
    return PaslonServices.AddPaslon(req, res);
  }

  Update(req: Request, res: Response): Promise<Response> {
    return PaslonServices.Update(req, res);
  }

  Delete(req: Request, res: Response): Promise<Response> {
    return PaslonServices.Delete(req, res);
  }
})();
