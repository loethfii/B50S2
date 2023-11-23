import PaslonPartaiService from "../services/PaslonPartaiService";
import { Request, Response } from "express";

export default new (class PaslonPartaiController {
  AddPaslonPartai(req: Request, res: Response): Promise<Response> {
    return PaslonPartaiService.AddPaslonPartai(req, res);
  }
})();
