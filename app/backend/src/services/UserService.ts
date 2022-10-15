// import * as bcrypt from 'bcryptjs';
// import IUser from '../helpers/interfaces/IUser';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import createToken from '../helpers/crypt/token';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default class UserService {
  model: User;
  _jwt = jwt;

  constructor() {
    this.model = new User();
    this._jwt = jwt;
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

  public validate = async (authorization: string) => {
    const isValid = this._jwt.verify(authorization, JWT_SECRET);
    if (!isValid) return null;
    const validUser = await User.findOne({ where: isValid.match });
    if (!validUser) return null;
    return validUser;
  };
}
