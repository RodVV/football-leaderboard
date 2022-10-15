import Team from '../database/models/Team';

export default class TeamService {
  model: Team;

  constructor() {
    this.model = new Team();
  }

  public getAll = async () => {
    const teams = Team.findAll();
    if (!teams) return null;
    return teams;
  };

  public getId = async (id: number) => {
    const findTeam = Team.findByPk(id);
    if (!findTeam) return null;
    return findTeam;
  };
}
