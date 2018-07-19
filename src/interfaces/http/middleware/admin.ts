import { Response } from "express";
import Status from "http-status";
interface IUser {
  email: string;
  name: string;
  isBusiness: boolean;
  role: string;
}

export const admin = (req: any, res: Response, next: any) => {
  const user = req.user as IUser;
  if (user.role !== "admin") {
    return res.status(Status.BAD_REQUEST).json({
      details: "Access Denied",
      type: "AuthorizationError"
    });
  }
  return next();
};
