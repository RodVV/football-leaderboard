// import * as jwt from 'jsonwebtoken';
// import 'dotenv/config';
// import User from '../../database/models/User';

// const JWT_SECRET = process.env.JWT_SECRET as string;

// interface IUserPass {
//   userPass: string;
// }

// export default async function tokenValidation(header: string) {
//   const isValid = jwt.verify(header, JWT_SECRET) as IUserPass;
//   if (!isValid) return null;
//   // console.log(isValid);
//   // const userPass = isValid;
//   const userPass = await User.findOne({ where: { where: isValid.match } });
//   if (!userPass) return null;
//   return userPass;
// }
