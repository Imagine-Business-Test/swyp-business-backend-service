import { IAuthenticatedUser } from "../../../contracts/interfaces";

import { Response } from "express";
import Status from "http-status";
import jwt from "jsonwebtoken";

export const auth = (req: any, res: Response, next: any) => {
  let token = req.get("Authorization");

  if (!token) {
    return res.status(Status.BAD_REQUEST).json({
      details: "Authorization token not passed",
      type: "ValidationError"
    });
  }

  try {
    token = token.replace("Bearer: ", "");
    const user: IAuthenticatedUser = (req.user = jwt.verify(
      token,
      req.config.web.json_secret
    ) as IAuthenticatedUser);

    if (!user.isBusiness) {
      throw new Error("AuthorizationError");
    }
    return next();
  } catch (ex) {
    if (ex.message === "AuthorizationError") {
      return res.status(Status.UNAUTHORIZED).json({
        details: "Access Denied",
        type: "AuthorizationError"
      });
    }

    return res.status(Status.UNAUTHORIZED).json({
      details: ex.message,
      type: "InvalidateToken"
    });
  }
};
