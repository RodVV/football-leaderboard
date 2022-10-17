import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
// import validMatch from '../middlewares/matches.validation';
// import User from '../database/models/User';

const matchesRoute = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoute.get('/', matchesController.getAll);
matchesRoute.post('/', matchesController.postMatch);

export default matchesRoute;
