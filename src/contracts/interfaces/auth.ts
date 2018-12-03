export interface ILoggedInUser {
  email: string;
  name: string;
}
export interface IAuthenticatedUser {
  isBusiness: boolean;
  branch: string;
  email: string;
  name: string;
  role: string;
}
