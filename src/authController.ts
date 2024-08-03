import { Request, Response } from 'express';

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
      console.log('getUsers method called');
      res.json({ message: 'Server is working' });
    } catch (e) {
      console.error('Error in getUsers method:', e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AuthController();
