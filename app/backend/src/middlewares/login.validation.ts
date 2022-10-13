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
};

export default loginValidation;
