export interface IAccount {
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginIn?: Date;
  deleted?: boolean;
  password?: string;
  updatedAt?: Date;
  created?: Date;
  branch: string;
  phone: string;
  email: string;
  name: string;
  role: string;
}

export interface IBusiness {
  id: string;
  name: string;
}
