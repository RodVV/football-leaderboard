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

  public postMatch = async (match: {
    id?: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }) => {
    const newMatch = await Matches.create({ match });
    // if (!newMatch) return null;
    return newMatch;
  };
}
