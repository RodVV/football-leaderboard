// import IScoreboard from '../helpers/interfaces/IScoreboard';
// import { ITeamName } from '../helpers/interfaces/ITeam';
import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private matchesModel = Matches;
  private teamsModel = Team;

  public getScoreboard = async (team: string) => {
    // const teamScores = [];
    const findTeam = await this.teamsModel.findOne({ where: { teamName: team } });
    const teamId = findTeam?.id;
    const getTeamMatchs = await this.matchesModel.findAll({
      where: { homeTeam: teamId } });
    return getTeamMatchs;
  };
}
