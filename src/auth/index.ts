import {AuthModel} from './model';

export class AuthModule {
  private authModel = new AuthModel();

  async login(username: string, password: string): Promise<Boolean> | never {
    const user = this.authModel.findOneByName(username);
    if (user) {
      return user.password === password;
    }

    throw {
      statusCode: 404,
      message: 'incorrect login data',
    };
  }
}
