import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import ValidMatch from '../middlewares/matches.validation';
// import User from '../database/models/User';

const matchesRoute = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);
const matchValidations = new ValidMatch();

matchesRoute.get('/', matchesController.getAll);
matchesRoute.post(
  '/',
  matchValidations.verifyTeams,
  matchValidations.validToken,
  matchesController.postMatch,
);
matchesRoute.patch('/:id/finish', matchesController.finishMatch);
matchesRoute.patch('/:id', matchesController.patchMatch);

export default matchesRoute;
