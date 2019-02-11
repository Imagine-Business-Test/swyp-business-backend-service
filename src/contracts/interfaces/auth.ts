export interface ILoggedInUser {
  email: string;
  role: string;
  name: string;
}
export interface IAuthenticatedUser {
  isBusiness: boolean;
  branch: string;
  email: string;
  name: string;
  role: string;
}
