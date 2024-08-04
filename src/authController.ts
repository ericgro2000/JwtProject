import { Request, Response } from "express";
import Role from "./models/Role";
import bcrypt from "bcrypt";
import User from "./models/User";

class AuthController {
  async registration(req: Request, res: Response): Promise<Response> {
    try {
      //todo make this fn
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res
      //     .status(400)
      //     .json({ message: "Ошибка при регистрации", errors });
      // }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole!.value],
      });
      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      // Handle login logic
      return res.json({ message: "Login successful" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      await Role.create([{ value: "USER" }, { value: "ADMIN" }]);
      const userRole = new Role();
      const adminRole = new Role({ value: "ADMIN" });
      await userRole.save();
      await adminRole.save();
      console.log("getUsers method called");
      return res.json({ message: "Server is working" });
    } catch (e) {
      console.error("Error in getUsers method:", e);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new AuthController();
