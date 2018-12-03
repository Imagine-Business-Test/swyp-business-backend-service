export interface IAccount {
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginIn?: Date;
  deleted?: boolean;
  password?: string;
  updatedAt?: Date;
  created?: Date;
  _id?: string;
  branch: string;
  phone: string;
  email: string;
  name: string;
  role: string;
}

export interface IBusiness {
  id: string;
  slug: string;
  name: string;
}
