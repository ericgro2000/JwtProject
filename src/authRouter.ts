import express, { Router } from 'express';
import controller from "./authController"
const router: Router = express.Router();

router.post('/registration',controller.registration)

router.post('/login',controller.login)

router.get('/users',controller.getUsers)

export default router;