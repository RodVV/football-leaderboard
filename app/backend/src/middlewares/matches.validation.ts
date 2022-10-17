import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IAuthorization from '../helpers/interfaces/IAuthorization';
import 'dotenv/config';
import User from '../database/models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

const validMatch = {

  async validToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers as IAuthorization;
    try {
      const isValid = jwt.verify(authorization, JWT_SECRET);
      if (isValid) next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  },

  async verifyTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const findHomeTeam = await User.findOne({ where: { homeTeam } });
    const findAwayTeam = await User.findOne({ where: { awayTeam } });
    if (!findHomeTeam || !findAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  },

};

export default validMatch;
