import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IAuthorization from '../helpers/interfaces/IAuthorization';
import 'dotenv/config';
import Matches from '../database/models/Matches';

const JWT_SECRET = process.env.JWT_SECRET as string;

class ValidMatch {
  private matchModel = Matches;
  private jwtModel = jwt;

  public verifyTeams = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | undefined> => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    const findHomeTeam = await this.matchModel.findOne({ where: homeTeam });
    const findAwayTeam = await this.matchModel.findOne({ where: awayTeam });
    if (!findHomeTeam || !findAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  };

  public async validToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers as IAuthorization;
    try {
      const isValid = this.jwtModel.verify(authorization, JWT_SECRET);
      if (isValid) next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default ValidMatch;
