export type LoginInput = {
  login: string;
  password: string;
};

export class LoginInputDto {
  login: string;
  password: string;

  constructor(info: LoginInput) {
    this.login = info.login;
    this.password = info.password;
  }
}

export type CurrentUser = {
  id: string;
};
