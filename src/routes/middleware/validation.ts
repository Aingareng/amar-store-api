// src/middlewares/validation.ts
import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

export function validate<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validasi body request dan parse ke tipe yang benar
      const parsedData = schema.parse(req.body);

      // Ganti req.body dengan data yang sudah diparsing
      req.body = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
}
