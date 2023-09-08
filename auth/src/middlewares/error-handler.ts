import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

type FormattedError = {
  message: string;
  field?: string;
};

type ErrorResponse = {
  errors: FormattedError[];
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  } as ErrorResponse);
};
