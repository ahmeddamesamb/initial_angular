export interface IAuthentification {
  email: string,
  password: string,}

class Auth implements IAuthentification {
  email: string;
  password: string;


  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
