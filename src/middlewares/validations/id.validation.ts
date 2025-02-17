import { Request, Response, NextFunction } from "express";
import { validateObjectId } from "../../utils/mongo.utils";

export const validateId = (...params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const param of params) {
      const id = req.params[param] || req.query[param] || req.body[param];
      validateObjectId(id, param);
    }

    next();
  };
};
