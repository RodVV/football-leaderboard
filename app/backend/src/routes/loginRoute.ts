import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import User from '../database/models/User';

const loginRoute = Router();
const usersService = new UserService(User);
const usersController = new UserController(usersService);

loginRoute.post('/login', usersController.login);

export default loginRoute;
