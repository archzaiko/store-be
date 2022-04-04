import {Router} from 'express';

import {AuthService} from './auth.service';

import {getRequestDataJSON} from '../api/utils';

interface LoginRequestBody {
  username: string;
  password: string;
}

const AuthRouter = Router();
const auth = new AuthService();

AuthRouter.use((req, res, next) => {
  console.log(req.url);
  next();
});

AuthRouter.post('/login', async (req, res, next) => {
  const data = await getRequestDataJSON<LoginRequestBody>(req);

  const username = data.username;
  const password = data.password;

  try {
    const authorized = await auth.login(username, password);
    res.status(200).json({
      message: 'success',
      data: authorized,
    });
  } catch (error) {
    res.status(400).json({
      message: 'incorrect login data',
    });
  }

  next();
});

export {AuthRouter};
