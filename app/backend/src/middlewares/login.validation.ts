import { NextFunction, Request, Response } from 'express';

const loginValidation = {
  verifyFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (email === undefined || password === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  },

  validEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (emailRegex.test(email) === false) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  },
};

export default loginValidation;
