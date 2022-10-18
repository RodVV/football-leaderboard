import { TAllTeamsScore, IScoreboard } from '../helpers/interfaces/IScoreboard';
// import { ITeamName } from '../helpers/interfaces/ITeam';
import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class AwayLeaderboardService {
  private matchesModel = Matches;
  private teamsModel = Team;

  public getAwayMatchs = async (team: string) => {
    const findTeam = await this.teamsModel.findOne({ where: { teamName: team } });
    const teamId = findTeam?.id;
    const getTeamMatchs = await this.matchesModel.findAll({
      where: { awayTeam: teamId, inProgress: false },
    });
    return getTeamMatchs;
  };

  public getAwayPoints = async (team: string) => {
    const matchs = await this.getAwayMatchs(team);
    const vicValue = 3;
    const vicMatchs = matchs.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const drawMatchs = matchs.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const lossMatchs = matchs.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const points = (vicMatchs.length * vicValue) + drawMatchs.length + (lossMatchs.length * 0);
    return points as number;
  };

  public getScoredGoals = async (team: string) => {
    const matchs = await this.getAwayMatchs(team);
    // eslint-disable-next-line no-return-assign
    const scored = matchs.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return scored as number;
  };

  public getOwnGoals = async (team: string) => {
    const matchs = await this.getAwayMatchs(team);
    // eslint-disable-next-line no-return-assign
    const scored = matchs.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return scored as number;
  };

  public getAwayScore = async (team: string) => {
    const matchs = await this.getAwayMatchs(team);
    const vicMatchs = matchs.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const drawMatchs = matchs.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const lossMatchs = matchs.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const tEfficiency = ((await this.getAwayPoints(team) / (matchs.length * 3)) * 100).toFixed(2);
    const teamHomeScore: IScoreboard = {
      name: team,
      totalPoints: await this.getAwayPoints(team),
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

  public awayScoreBoard = async () => {
    const teams = [];
    const findAll = await this.teamsModel.findAll({ attributes: { exclude: ['id'] } });
    for (let i = 0; i < findAll.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const getTeam = await this.getAwayScore(findAll[i].teamName);
      teams.push(getTeam);
    }
    return teams as TAllTeamsScore;
  };
}
