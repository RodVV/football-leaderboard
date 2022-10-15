import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
// import User from '../database/models/User';

const teamsRoute = Router();
const teamsService = new TeamService();
const teamssController = new TeamController(teamsService);

teamsRoute.get('/', teamssController.getAll);
teamsRoute.get('/:id', teamssController.getId);

export default teamsRoute;
