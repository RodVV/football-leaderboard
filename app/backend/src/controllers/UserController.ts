import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.userService.login(email, password);
    // if (!result) {
    //   return res.status(404).json({ message: '404' });
    // }
    return res.status(200).json({ result });
  };

  // async validate(req: Request, res: Response) {
  //   const { authorization } = req.headers;
  //   const response = await this.userService.validate(authorization);
  //   if (!response) {
  //     return res.status(401).json({ message: 'Token not found' });
  //   }
  //   return res.status(200).json({ role: response.role });
  // }
}
