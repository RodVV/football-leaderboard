import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';
// import User from '../database/models/User';

const leaderboardRoute = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

// leaderboardRoute.get('/', leaderboardController.getHomeMatchs);
leaderboardRoute.get('/home', leaderboardController.getHomeScore);
leaderboardRoute.get('/away', leaderboardController.getAwayScore);

export default leaderboardRoute;
