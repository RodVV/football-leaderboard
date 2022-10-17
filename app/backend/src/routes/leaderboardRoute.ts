import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';
// import User from '../database/models/User';

const leaderboardRoute = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoute.get('/', leaderboardController.getScoreboard);

export default leaderboardRoute;
