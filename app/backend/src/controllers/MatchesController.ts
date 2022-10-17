import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
// import UserService from '../services/UserService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
    // private userService = new UserService(),
  ) {}

  public getAll = async (req: Request, res: Response) => {
    const result = await this.matchesService.getAll();
    if (!result) {
      return res.status(404).json({ error: '404' });
    }
    return res.status(200).json(result);
  };

  public postMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    try {
      const result = await this.matchesService.postMatch({ homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress });
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
      return res.status(404).json(error);
    }
  };
}
