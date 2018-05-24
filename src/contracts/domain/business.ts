export interface Account {
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginIn?: Date;
  password: string;
  updatedAt?: Date;
  phone: string;
  created?: Date;
  email: string;
  name: string;
}


