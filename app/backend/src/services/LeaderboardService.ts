import HomeLeaderboardService from './HomeLeaderboardService';
// import { TAllTeamsScore, IScoreboard } from '../helpers/interfaces/IScoreboard';
// import { ITeamName } from '../helpers/interfaces/ITeam';
import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private matchesModel = Matches;
  private teamsModel = Team;
  constructor(private homeLeaderboardService = new HomeLeaderboardService()) {}

  public homeLeaderboard = async () => {
    const teams = this.homeLeaderboardService.homeScoreBoard();
    const sortedBoard = (await teams).sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.totalGames + a.totalGames);
    return sortedBoard;
  };
}
