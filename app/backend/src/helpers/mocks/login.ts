import createToken from '../crypt/token';

const userMock = {
  id: 1,
  username: 'Mock',
  role: 'admin',
  email: 'mock@mock.com',
  password: 'mockword',
};

const tokenMock = {
  token: createToken(userMock.email),
};

const usersMockArray = {
  users: [
    {
      id: 1,
      username: 'Mock',
      role: 'admin',
      email: 'mock@mock.com',
      password: 'mockword',
    },
    {
      id: 2,
      username: 'Mock2',
      role: 'admin',
      email: 'mock@mock2.com',
      password: 'mockword2',
    },
  ],
};

export { userMock, tokenMock, usersMockArray };
