import PartaiService from "../services/PartaiService";
import { Request, Response } from "express";

export default new (class PartaiController {
  FindAll(req: Request, res: Response): Promise<Response> {
    return PartaiService.FindAll(req, res);
  }

  FindOne(req: Request, res: Response): Promise<Response> {
    return PartaiService.FindOne(req, res);
  }

  AddPartai(req: Request, res: Response): Promise<Response> {
    return PartaiService.AddPartai(req, res);
  }

  Update(req: Request, res: Response): Promise<Response> {
    return PartaiService.Update(req, res);
  }

  Delete(req: Request, res: Response): Promise<Response> {
    return PartaiService.Delete(req, res);
  }
})();
