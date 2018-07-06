export interface IAccount {
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginIn?: Date;
  deleted?: boolean;
  password?: string;
  updatedAt?: Date;
  created?: Date;
  phone: string;
  email: string;
  name: string;
  role: string;
}
