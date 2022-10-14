// import * as bcrypt from 'bcryptjs';
// import IUser from '../helpers/interfaces/IUser';
import User from '../database/models/User';
import createToken from '../helpers/crypt/token';
// import tokenValidation from '../middlewares/toke.validation';

export default class UserService {
  model: User;

  constructor() {
    this.model = new User();
  }

  public login = async (email: string, _password: string): Promise<string | null> => {
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return null;
    }
    // const cryptPassword = bcrypt.compareSync(password, findUser.password);
    // if (!cryptPassword) {
    //   return null;
    // }
    const loginToken = createToken(findUser.email);
    return loginToken;
    // return findUser;
  };

  // async validate(IUser: object): Promise<IUser> {
  //   const isValid = await this.userModel.tokenValidation(IUser);
  // }
}
