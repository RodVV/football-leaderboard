import Team from '../database/models/Team';
import Matches from '../database/models/Matches';
// import IMatches from '../helpers/interfaces/IMatches';

export default class MatchesService {
  private model = Matches;

  public getAll = async (): Promise<Matches[] | null> => {
    const matches = await this.model.findAll({
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

  public postMatch = async (match: object) => {
    const newMatch = await this.model.create(match);
    // if (!newMatch) return null;
    return newMatch;
  };
}
