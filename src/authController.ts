import { Request, Response } from "express";
import Role from "./models/Role";
import bcrypt from "bcrypt";
import User from "./models/User";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { config } from "./config";
import { ObjectId } from "mongoose";

const generateAccessToken = (id: any, roles: string[]) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, config.secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
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
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find();
      //res.json(users);
      console.log("getUsers method called");
      return res.json({ users });
    } catch (e) {
      console.error("Error in getUsers method:", e);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new AuthController();
