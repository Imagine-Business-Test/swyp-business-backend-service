export interface Account {
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginIn?: Date;
  password: string;
  phone: string;
  created: Date;
  email: string;
  name: string;
}
