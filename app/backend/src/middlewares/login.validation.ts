import { NextFunction, Request, Response } from 'express';
import User from '../database/models/User';

const incorrectFields = 'Incorrect email or password';
const emptyFields = 'All fields must be filled';

const loginValidation = {

  verifyFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: emptyFields });
    }
    if (email === undefined || password === undefined) {
      return res.status(400).json({ message: emptyFields });
    }
    next();
  },

  validEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (emailRegex.test(email) === false) {
      return res.status(401).json({ message: incorrectFields });
    }
    next();
  },

  async validUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res.status(401).json({ message: incorrectFields });
    }
    if (findUser.password !== password) {
      return res.status(401).json({ message: incorrectFields });
    }
    if (findUser.email !== email) {
      return res.status(401).json({ message: incorrectFields });
    }
    next();
  },
};

export default loginValidation;
