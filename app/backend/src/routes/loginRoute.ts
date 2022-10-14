import { Router } from 'express';
import loginValidation from '../middlewares/login.validation';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
// import User from '../database/models/User';

const loginRoute = Router();
const usersService = new UserService();
const usersController = new UserController(usersService);

loginRoute.post(
  '/',
  loginValidation.verifyFields,
  // loginValidation.validEmail,
  // loginValidation.validUser,
  usersController.login,
);

// loginRoute.get('/login/validate', usersController.validate);

export default loginRoute;
