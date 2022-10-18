import { TAllTeamsScore, IScoreboard } from '../helpers/interfaces/IScoreboard';
// import { ITeamName } from '../helpers/interfaces/ITeam';
import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class HomeLeaderboardService {
  private matchesModel = Matches;
  private teamsModel = Team;

  public getHomeMatchs = async (team: string) => {
    // const teamScores = [];
    const findTeam = await this.teamsModel.findOne({ where: { teamName: team } });
    const teamId = findTeam?.id;
    const getTeamMatchs = await this.matchesModel.findAll({
      where: { homeTeam: teamId },
    });
    const getFinishedMatchs = getTeamMatchs.filter((matchs) => matchs.inProgress !== true);
    return getFinishedMatchs;
  };

  public getHomePoints = async (team: string) => {
    const matchs = await this.getHomeMatchs(team);
    const vicValue = 3;
    const vicMatchs = matchs.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const drawMatchs = matchs.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const lossMatchs = matchs.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const points = (vicMatchs.length * vicValue) + drawMatchs.length + (lossMatchs.length * 0);
    return points as number;
  };

  public getScoredGoals = async (team: string) => {
    const matchs = await this.getHomeMatchs(team);
    // eslint-disable-next-line no-return-assign
    const scored = matchs.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return scored as number;
  };

  public getOwnGoals = async (team: string) => {
    const matchs = await this.getHomeMatchs(team);
    // eslint-disable-next-line no-return-assign
    const scored = matchs.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return scored as number;
  };

  public getHomeScore = async (team: string) => {
    const matchs = await this.getHomeMatchs(team);
    const vicMatchs = matchs.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const drawMatchs = matchs.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const lossMatchs = matchs.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const tEfficiency = ((await this.getHomePoints(team) / (matchs.length * 3)) * 100).toFixed(2);
    const teamHomeScore: IScoreboard = {
      name: team,
      totalPoints: await this.getHomePoints(team),
      totalGames: matchs.length,
      totalVictories: vicMatchs.length,
      totalDraws: drawMatchs.length,
      totalLosses: lossMatchs.length,
      goalsFavor: await this.getScoredGoals(team),
      goalsOwn: await this.getOwnGoals(team),
      goalsBalance: (await (this.getScoredGoals(team)) - await (this.getOwnGoals(team))),
      efficiency: tEfficiency,
    };
    return teamHomeScore as IScoreboard;
  };

  public homeLeaderboard = async () => {
    const teams = [];
    const findAll = await this.teamsModel.findAll({ attributes: { exclude: ['id'] } });
    for (let i = 0; i < findAll.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const getTeam = await this.getHomeScore(findAll[i].teamName);
      teams.push(getTeam);
    }
    // const sortTeams = teams.sort(a, b) {
    //   return (a.totalPoints) - (b.totalPoints)
    // }
    return teams as TAllTeamsScore;
  };
}
