import PemiluNewsControllers from "../controllers/PemiluNewsControllers";
import { Router } from "express";
import Auth from "../middleware/auth";

const routerPemiluNews = Router();

routerPemiluNews.get(
  "/pemilu-news",
  Auth.AccessValidation,
  PemiluNewsControllers.FindAll
);
routerPemiluNews.get(
  "/pemilu-news/details/:id",
  Auth.AccessValidation,
  PemiluNewsControllers.FindOne
);
routerPemiluNews.post(
  "/pemilu-news",
  Auth.AccessValidation,
  PemiluNewsControllers.AddPemiluNews
);
routerPemiluNews.put(
  "/pemilu-news/update/:id",
  Auth.AccessValidation,
  PemiluNewsControllers.UpdatePemiluNews
);
routerPemiluNews.delete(
  "/pemilu-news/delete/:id",
  Auth.AccessValidation,
  PemiluNewsControllers.DeletePemiluNews
);
export default routerPemiluNews;
