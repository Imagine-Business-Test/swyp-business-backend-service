import Status  from "http-status";

export const errorHandler = (err: any, _req: any, res: any, _next: any): void => {

  if (err.message === "ValidationError") {
    return res.status(Status.BAD_REQUEST).json({
      type: "ValidationError",
      message: err.details
    });
  }

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: "InternalServerError",
    message: "The server failed to handle the request",
  });
};
