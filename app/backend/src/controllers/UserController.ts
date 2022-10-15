import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.userService.login(email, password);
    return res.status(200).json({ token: result });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const validUser = await this.userService.validate(authorization as string);
    if (!validUser) {
      return res.status(401).json({ message: 'Token not found' });
    }
    return res.status(200).json({ role: validUser.role });
  };
}
