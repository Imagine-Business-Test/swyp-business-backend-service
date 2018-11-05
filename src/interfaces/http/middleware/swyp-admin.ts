import { Response } from "express";
import Status from "http-status";
interface IUser {
  email: string;
  name: string;
  isBusiness: boolean;
  role: string;
}

export const swypAdmin = (req: any, res: Response, next: any) => {
  const user = req.user as IUser;
  if (user.role !== "admin") {
    return res.status(Status.UNAUTHORIZED).json({
      details: "Access Denied",
      type: "AuthorizationError"
    });
  }
  return next();
};
