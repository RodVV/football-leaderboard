import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getAll = async (req: Request, res: Response) => {
    const result = await this.matchesService.getAll();
    if (!result) {
      return res.status(404).json({ error: '404' });
    }
    return res.status(200).json(result);
  };

  // public getId = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const result = await this.teamService.getId(Number(id));
  //   if (!result) {
  //     return res.status(404).json({ error: '404' });
  //   }
  //   return res.status(200).json(result);
  // };
}
