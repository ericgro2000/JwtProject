import express, { Router } from "express";
import controller from "./authController";
const router: Router = express.Router();
import { check } from "express-validator";
import authMiddleware from "./middleware/authMiddleware";
import roleMiddleware from "./middleware/roleMiddleware";

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);

router.post("/login", controller.login);

router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

export default router;
