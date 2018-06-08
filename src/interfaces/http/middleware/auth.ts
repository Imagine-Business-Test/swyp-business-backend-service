import { Response } from "express";
import Status from "http-status";
import jwt from "jsonwebtoken";

type User = { email: string, name: string, isBusiness: Boolean };

export const auth = (req: any, res: Response, next: any) => {
  let token = req.get("Authorization");

  if (!token) {
    return res.status(Status.BAD_REQUEST).json({
      type: "ValidationError",
      details: "Authorization token not passed"
    });
  }

  try {
    token = token.replace("Bearer: ", "");
    const user: User = req.user = <User>jwt.verify(token, req.config.web.json_secret);

    if (!user.isBusiness)
      throw new Error("AuthorizationError");
    return next();
  } catch (ex) {
    if (ex.message === "AuthorizationError") {
      return res.status(Status.UNAUTHORIZED).json({
        type: "AuthorizationError",
        details: "Access Denied"
      });
    }

    return res.status(Status.UNAUTHORIZED).json({
      type: "InvalidateToken",
      details: ex.message
    });
  }
};
