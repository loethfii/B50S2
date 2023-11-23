import PaslonPartaiController from "../controllers/PaslonPartaiController";
import { Router } from "express";
import Auth from "../middleware/auth";

const routerPaslonPartai = Router();

routerPaslonPartai.post(
  "/paslon-partai",
  Auth.AccessValidation,
  PaslonPartaiController.AddPaslonPartai
);

export default routerPaslonPartai;
