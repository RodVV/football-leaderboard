import { Model, INTEGER, BOOLEAN } from 'sequelize';
import database from '.';
import Team from './Team';

export default class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!:number;
  awayTeam!:number;
  awayTeamGoals!:number;
  inProgress!:boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
    allowNull: false,
    unique: true,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: database,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatches' });
Team.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatches' });
