import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const validateData = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (parsed.success) {
      next();
    } else {
      res.status(400).json({ message: parsed.error.errors });
    }
  };
};

export default validateData;
