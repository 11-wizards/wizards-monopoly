export type ProfileInput = {
  displayName: string;
  email: string;
  firstName: string;
  login: string;
  phone: string;
  secondName: string;
};

export class ProfileInputDto {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;

  constructor(info: ProfileInput) {
    this.first_name = info.firstName;
    this.second_name = info.secondName;
    this.display_name = info.displayName;
    this.login = info.login;
    this.email = info.email;
    this.phone = info.phone;
  }
}

export type ProfileChangePasswordInput = {
  newPassword: string;
  oldPassword: string;
};

export class ProfileChangePasswordInputDto {
  oldPassword: string;
  newPassword: string;

  constructor(info: ProfileChangePasswordInput) {
    this.oldPassword = info.oldPassword;
    this.newPassword = info.newPassword;
  }
}
