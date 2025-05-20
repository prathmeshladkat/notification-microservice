import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// Generic Zod validation middleware
export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        error: "Validation failed",
        details: err.errors || err.message,
      });
      return; // ✅ ensures no further code runs
    }
  };
};
