import HomeLeaderboardService from './HomeLeaderboardService';
import AwayLeaderboardService from './AwayLeaderboard';
import { IScoreboard } from '../helpers/interfaces/IScoreboard';
// import { ITeamName } from '../helpers/interfaces/ITeam';
import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private matchesModel = Matches;
  private teamsModel = Team;
  constructor(
    private homeLeaderboardService = new HomeLeaderboardService(),
    private awayLeaderboardService = new AwayLeaderboardService(),
  ) {}

  public sortBoard = async (teams: IScoreboard[]) => {
    const sortedBoard = await (teams).sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.totalGames + a.totalGames);
    return sortedBoard;
  };

  public homeLeaderboard = async () => {
    const teams = await this.homeLeaderboardService.homeScoreBoard();
    const sortedHomeBoard = await this.sortBoard(teams);
    return sortedHomeBoard;
  };

  public awayLeaderboard = async () => {
    const teams = await this.awayLeaderboardService.awayScoreBoard();
    const sortedAwayBoard = await this.sortBoard(teams);
    return sortedAwayBoard;
  };
}
