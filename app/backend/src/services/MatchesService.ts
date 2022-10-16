import Team from '../database/models/Team';
import Matches from '../database/models/Matches';
// import IMatches from '../helpers/interfaces/IMatches';

export default class MatchesService {
  model: Matches;

  constructor() {
    this.model = new Matches();
  }

  public getAll = async (): Promise<Matches[] | null> => {
    const matches = Matches.findAll({
      include: [{
        model: Team,
        as: 'teamHome' as string,
        attributes: { include: ['teamName'], exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway' as string,
        attributes: { include: ['teamName'], exclude: ['id'] },
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
