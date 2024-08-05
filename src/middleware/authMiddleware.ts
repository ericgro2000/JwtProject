import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

interface DecodedData extends JwtPayload {
  [key: string]: any;
}

interface CustomRequest extends Request {
  user?: DecodedData;
}

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    const decodedData = jwt.verify(token, config.secret) as DecodedData;
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
