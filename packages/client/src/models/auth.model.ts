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

export type RegisterInput = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class RegisterInputDto {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;

  constructor(info: RegisterInput) {
    this.first_name = info.firstName;
    this.second_name = info.secondName;
    this.login = info.login;
    this.email = info.email;
    this.password = info.password;
    this.phone = info.phone;
  }
}

export type CurrentUser = {
  id: string;
};
