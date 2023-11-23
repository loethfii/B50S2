import { AppDataSource } from "./data-source";
import * as cors from "cors";
import * as express from "express";
import routerPaslon from "./routes/PaslonRoutes";
import routerPemiluNews from "./routes/PemiluNewsRoutes";
import routerPartai from "./routes/PartaiRoutes";
import routerPaslonPartai from "./routes/PaslonPartaiRoutes";
import routerVoters from "./routes/VotersRoutes";
import userRouter from "./routes/UserRoutes";
import cloudinary from "./middleware/cloudinary";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 3000;

    const corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));

    app.use(express.json());
    app.use("/api/v1/", routerPemiluNews);
    app.use("/api/v1/", routerPaslon);
    app.use("/api/v1/", userRouter);
    app.use("/api/v1/", routerPartai);
    app.use("/api/v1/", routerPaslonPartai);
    app.use("/api/v1/", routerVoters);
    cloudinary.upload();
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
