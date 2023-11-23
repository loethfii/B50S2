import PartaiController from "../controllers/PartaiController";
import { Router } from "express";
import FileUpload from "../middleware/FileUpload";
import Auth from "../middleware/auth";

const routerPartai = Router();
const uploadImagePartai = new FileUpload("image");
routerPartai.get("/partai", Auth.AccessValidation, PartaiController.FindAll);
routerPartai.get(
  "/partai/:id",
  Auth.AccessValidation,
  PartaiController.FindOne
);
routerPartai.post(
  "/partai/add",
  Auth.AccessValidation,
  uploadImagePartai.handleUpload.bind(uploadImagePartai),
  PartaiController.AddPartai
);

routerPartai.put(
  "/partai/update/:id",
  Auth.AccessValidation,
  uploadImagePartai.handleUpload.bind(uploadImagePartai),
  PartaiController.Update
);

routerPartai.delete(
  "/partai/delete/:id",
  Auth.AccessValidation,
  PartaiController.Delete
);

export default routerPartai;
