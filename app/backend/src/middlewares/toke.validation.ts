import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../database/models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface IUserId {
  userId: number;
}

export default async function tokenValidation(req: Request, res: Response) {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const dataToken = jwt.verify(authorization, JWT_SECRET) as IUserId;
    const { userId } = dataToken;
    const findUser = await User.findByPk(userId);
    return findUser;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
