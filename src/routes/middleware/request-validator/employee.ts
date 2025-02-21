import Joi from "joi";
import { RequestHandler } from "express";
import { IEmployeeData } from "../../../interfaces/employee";

const createEmployeeSchema = Joi.object<IEmployeeData>({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  isMale: Joi.boolean().required(),
  age: Joi.date().required(),
  education: Joi.string().required(),
  experience: Joi.date().optional(),
  leadership: Joi.string().optional(),
  // id, createdAt, updatedAt biasanya ditangani secara otomatis oleh DB
});

export const validateCreateEmployee: RequestHandler = (req, res, next) => {
  const { error } = createEmployeeSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      status: 400,
      message: "Validasi gagal",
      errors: error.details.map((detail) => detail.message),
    });
    return;
  }
  next();
};

// ----------------------------------------------------

const updateEmployeeSchema = Joi.object<IEmployeeData>({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  phone: Joi.string().optional(),
  isMale: Joi.boolean().optional(),
  age: Joi.date().optional(),
  education: Joi.string().optional(),
  experience: Joi.date().optional(),
  leadership: Joi.string().optional(),
});

export const validateUpdateEmployee: RequestHandler = (req, res, next) => {
  const { error } = updateEmployeeSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      status: 400,
      message: "Validasi gagal",
      errors: error.details.map((detail) => detail.message),
    });
    return;
  }
  next();
};
