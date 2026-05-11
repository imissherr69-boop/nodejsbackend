import type { Request, Response, NextFunction } from "express";
import { z } from 'zod';

type ZodSchema = z.ZodSchema<any>;

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        message: "Validation Error",
        errors: err.errors || err.issues,
      });
    }
  };