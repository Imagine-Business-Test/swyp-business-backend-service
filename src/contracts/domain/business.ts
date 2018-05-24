export interface Account {
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginIn?: Date;
  deleted?: Boolean;
  password: string;
  updatedAt?: Date;
  created?: Date;
  phone: string;
  email: string;
  name: string;
}


