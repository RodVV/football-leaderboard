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

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.matchesService.finishMatch(id);
      if (result) return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: 'Match not found' });
    }
  };

  public patchMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      const onGoingMatch = await this.matchesService.patchMatch(id, homeTeamGoals, awayTeamGoals);
      if (onGoingMatch) return res.status(200).json(onGoingMatch);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: 'Match not found' });
    }
  };
}
