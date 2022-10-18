import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  // public getHomeMatchs = async (req: Request, res: Response) => {
  //   const { teamName } = req.body;
  //   try {
  //     const result = await this.homeLeaderboardService.getHomeMatchs(teamName);
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     return res.status(404).json(error);
  //   }
  // };

  public getHomeScore = async (req: Request, res: Response) => {
    // const { teamName } = req.body;
    try {
      const result = await this.leaderboardService.homeLeaderboard();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  public getAwayScore = async (req: Request, res: Response) => {
    // const { teamName } = req.body;
    try {
      const result = await this.leaderboardService.awayLeaderboard();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  public getLeaderboard = async (req: Request, res: Response) => {
    // const { teamName } = req.body;
    try {
      const result = await this.leaderboardService.leaderboard();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}
