export class AuthModel {
  private users = [{username: 'dev', password: 'dev'}];

  findOneByName(username: string) {
    return this.getAllUsers().find(user => user.username === username);
  }

  private getAllUsers() {
    return this.users;
  }
}
