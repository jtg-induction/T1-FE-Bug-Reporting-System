export interface RegsiterResponse {
  access: string;
}

export interface LoginResponse {
  access: string;
}

export interface SendInviteResponse {
  message: string;
}

export interface RegistrationFormData {
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  date_of_birth: string | null;
  phone: string | null;
  designation: string | number;
  jiraID: string;
  password: string;
  confirm_password: string;
}

export interface UserProfileProps {
  first_name: string;
  last_name: string;
  user_id: string;
  email: string;
}

export interface UserProps {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  designation: string;
  phone: string;
}

export interface UserUpdateProps {
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  designation: string | number;
  phone: string | null;
}
