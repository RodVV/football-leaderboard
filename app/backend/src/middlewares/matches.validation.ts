import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IAuthorization from '../helpers/interfaces/IAuthorization';
import 'dotenv/config';
// import User from '../database/models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

const validMatch = {

  async validToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers as IAuthorization;
    try {
      const isValid = jwt.verify(authorization, JWT_SECRET);
      if (isValid) next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

};

export default validMatch;
