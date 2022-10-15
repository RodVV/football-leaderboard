import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class MatchesService {
  model: Matches;

  constructor() {
    this.model = new Matches();
  }

  public getAll = async () => {
    const matches = Matches.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    if (!matches) return null;
    return matches;
  };

  // public getId = async (id: number) => {
  //   const findTeam = Team.findByPk(id);
  //   if (!findTeam) return null;
  //   return findTeam;
  // };
}
