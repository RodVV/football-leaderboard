import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
// import User from '../database/models/User';

const teamsRoute = Router();
const teamsService = new TeamService();
const teamsController = new TeamController(teamsService);

teamsRoute.get('/', teamsController.getAll);
teamsRoute.get('/:id', teamsController.getId);

export default teamsRoute;
