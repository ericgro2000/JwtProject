import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

interface JWTPayload extends JwtPayload {
  roles: string[];
}

export default function roleMiddleware(roles: string[]) {
  return (req: any, res: any, next: any) => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }

      const { roles: userRoles } = jwt.verify(
        token,
        config.secret
      ) as JWTPayload;
      const hasRole = userRoles.some((role) => roles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
}
