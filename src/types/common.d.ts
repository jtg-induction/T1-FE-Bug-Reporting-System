export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  designation: string | number;
}

export interface UserRegistrationData extends UserData {
  jiraID: string;
  password: string;
  confirm_password: string;
}

export interface LoginSignupRefreshResponse {
  access: string;
  user: UserData;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SendVerifyLinkData {
  email: string;
}

export interface VerifyLinkData {
  email: string;
  token: string;
}
