/* eslint-disable max-lines-per-function */
import HomeLeaderboardService from './HomeLeaderboardService';
import AwayLeaderboardService from './AwayLeaderboard';
import { IScoreboard } from '../helpers/interfaces/IScoreboard';
// import { ITeamName } from '../helpers/interfaces/ITeam';
// import Team from '../database/models/Team';
// import Matches from '../database/models/Matches';

export default class LeaderboardService {
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

  public leaderboard = async () => {
    const awayTeams = await this.awayLeaderboardService.awayScoreBoard();
    const homeTeams = await this.homeLeaderboardService.homeScoreBoard();
    const scoreboard = homeTeams.map((home: IScoreboard) => {
      const away = awayTeams.find((team: IScoreboard) => team.name === home.name) as IScoreboard;
      return {
        name: home.name,
        totalPoints: home.totalPoints + away.totalPoints,
        totalGames: home.totalGames + away.totalGames,
        totalVictories: home.totalVictories + away.totalVictories,
        totalDraws: home.totalDraws + away.totalDraws,
        totalLosses: home.totalLosses + away.totalLosses,
        goalsFavor: home.goalsFavor + away.goalsFavor,
        goalsOwn: home.goalsOwn + away.goalsOwn,
        goalsBalance: home.goalsBalance + away.goalsBalance,
        efficiency: ((
          (home.totalPoints + away.totalPoints)
          / ((home.totalGames + away.totalGames) * 3)) * 100).toFixed(2),
      };
    });
    const sortLeaderboard = await this.sortBoard(scoreboard);
    return sortLeaderboard;
  };
}
