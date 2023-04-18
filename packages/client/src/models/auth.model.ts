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
  email: string;
  firstName: string;
  login: string;
  password: string;
  phone: string;
  secondName: string;
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

export type CurrentUserDto = {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export class CurrentUser {
  id: number;
  firstName: string;
  secondName: string;
  displayName?: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;

  constructor(dto: CurrentUserDto) {
    this.id = dto.id;
    this.firstName = dto.first_name;
    this.secondName = dto.second_name;
    this.displayName = dto.display_name;
    this.login = dto.login;
    this.email = dto.email;
    this.phone = dto.phone;
    this.avatar = dto.avatar;
  }
}
