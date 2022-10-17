import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getScoreboard = async (req: Request, res: Response) => {
    const { teamName } = req.body;
    try {
      const result = await this.leaderboardService.getScoreboard(teamName);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}
