import * as jwt from 'jsonwebtoken';

import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function createToken(email: string) {
  const token = jwt.sign({ user: email }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
}
