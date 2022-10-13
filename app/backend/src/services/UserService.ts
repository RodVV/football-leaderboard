import * as bcrypt from 'bcryptjs';
// import IUser from '../helpers/interfaces/IUser';
import User from '../database/models/User';
import createToken from '../helpers/crypt/token';
// import tokenValidation from '../middlewares/toke.validation';

export default class UserService {
  constructor(private userModel: typeof User) {}
  async login(email: string, password: string): Promise<string | null> {
    const findUser = await this.userModel.findOne({ where: { email } });
    if (!findUser || findUser.password !== password) {
      return null;
    }
    const cryptPassword = bcrypt.compareSync(password, findUser.password);
    if (!cryptPassword) {
      return null;
    }
    const loginToken = createToken(findUser.email);
    return loginToken;
  }

  // async validate(IUser: object): Promise<IUser> {
  //   const isValid = await this.userModel.tokenValidation(IUser);
  // }
}
