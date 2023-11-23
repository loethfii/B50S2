import PaslonController from "../controllers/PaslonController";
import { Router } from "express";
import FileUpload from "../middleware/FileUpload";
import Auth from "../middleware/auth";

const routerPaslon = Router();
const uploadMiddleware = new FileUpload("image");
routerPaslon.get("/paslon", Auth.AccessValidation, PaslonController.FindAll);
routerPaslon.get(
  "/paslon/:id",
  Auth.AccessValidation,
  PaslonController.FindOne
);
routerPaslon.post(
  "/paslon/add",
  Auth.AccessValidation,
  uploadMiddleware.handleUpload.bind(uploadMiddleware),
  PaslonController.AddPaslon
);
routerPaslon.put(
  "/paslon/update/:id",
  Auth.AccessValidation,
  uploadMiddleware.handleUpload.bind(uploadMiddleware),
  PaslonController.Update
);
routerPaslon.delete(
  "/paslon/delete/:id",
  Auth.AccessValidation,
  PaslonController.Delete
);

export default routerPaslon;
