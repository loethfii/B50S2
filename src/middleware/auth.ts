import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();

interface ValidationRequest extends Request {
  userData?: {
    userId: number;
    username: string;
  };
}

export default new (class Auth {
  generateToken(userId: number, username: string): string {
    const secretKey = process.env.SECRET_KEY as string;
    const token = jwt.sign({ userId, username }, secretKey, {
      expiresIn: "1h",
    });
    return token;
  }

  AccessValidation(
    req: ValidationRequest,
    res: Response,
    next: NextFunction
  ): any {
    const Authorization = req.headers.authorization as string;

    if (Authorization === "")
      return res.status(401).json({ message: "need token" });

    if (!Authorization) {
      return res.status(401).json({ Error: "Unauthorized" });
    }

    const token = Authorization.startsWith("Bearer ")
      ? Authorization.split(" ")[1]
      : Authorization;

    // const token = Authorization;
    const secret = process.env.SECRET_KEY as string;

    try {
      const loginSession = jwt.verify(token, secret);
      res.locals.loginSession = loginSession;
      next();
    } catch (error) {
      return res.status(500).json({ Error: "Error while authenticating" });
    }
  }

  decodeWithoutBarier(reqHeader: string): any {
    const dataWithoutBarier = reqHeader.split(" ")[1];
    const decodeJWT = jwt.decode(dataWithoutBarier);
    return decodeJWT;
  }
})();
