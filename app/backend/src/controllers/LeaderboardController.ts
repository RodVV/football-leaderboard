import { Request, Response } from 'express';
import HomeLeaderboardService from '../services/HomeLeaderboardService';

export default class LeaderboardController {
  constructor(private homeLeaderboardService = new HomeLeaderboardService()) {}

  public getHomeMatchs = async (req: Request, res: Response) => {
    const { teamName } = req.body;
    try {
      const result = await this.homeLeaderboardService.getHomeMatchs(teamName);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  public getHomeScore = async (req: Request, res: Response) => {
    // const { teamName } = req.body;
    try {
      const result = await this.homeLeaderboardService.homeLeaderboard();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}
