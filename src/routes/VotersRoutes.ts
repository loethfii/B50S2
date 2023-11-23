import { Router } from "express";
import VoterController from "../controllers/VoterController";
import Auth from "../middleware/auth";

const routerVoters = Router();

routerVoters.get("/voters", Auth.AccessValidation, VoterController.FindAll);

routerVoters.post("/vote", Auth.AccessValidation, VoterController.VotePaslon);

routerVoters.get(
  "/count",
  Auth.AccessValidation,
  VoterController.CountDataVoter
);

export default routerVoters;
