import { Response, NextFunction, Request } from "express";
import HttpException from "../utils/exceptions/http.exception";
import { timeStamp } from "console";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const typedError = error as Partial<HttpException> & { type?: string };
  if (
    error instanceof SyntaxError &&
    typedError.type === "entity.parse.failed"
  ) {
    res.status(400).json({
      error: {
        message: "Invalid JSON format",
        code: "BAD_REQUEST",
        timeStamp: new Date(),
      },
    });
    return;
  }

  if (error instanceof HttpException) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
        timeStamp: new Date(),
      },
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    error: {
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
      timeStamp: new Date(),
    },
  });
};
