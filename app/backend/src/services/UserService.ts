import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import createToken from '../helpers/crypt/token';

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
}
