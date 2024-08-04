import { Request, Response } from 'express';
import Role from './models/Role';

class AuthController {
  async registration(req: Request, res: Response): Promise<void> {
    try {
      // Handle registration logic
    } catch (e) {
        console.error('Error in registration method:', e);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      // Handle login logic
    } catch (e) {
        console.error('Error in login method:', e);
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      await Role.create([{ value: "USER" }, { value: "ADMIN" }]);
      const userRole = new Role();
      const adminRole = new Role({ value: "ADMIN" });
      await userRole.save();
      await adminRole.save();
      console.log('getUsers method called');
      res.json({ message: 'Server is working' });
    } catch (e) {
      console.error('Error in getUsers method:', e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AuthController();
