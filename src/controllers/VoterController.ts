import VoterService from "../services/VoteService";
import { Request, Response } from "express";

export default new (class VotersController {
  FindAll(req: Request, res: Response): Promise<Response> {
    return VoterService.FindAll(req, res);
  }

  VotePaslon(req: Request, res: Response) {
    return VoterService.VotePaslon(req, res);
  }
})();
