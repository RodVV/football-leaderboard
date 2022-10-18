interface IScoreboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

type TScoreboard = IScoreboard;

type TAllTeamsScore = [IScoreboard];

export { TAllTeamsScore, IScoreboard, TScoreboard };
