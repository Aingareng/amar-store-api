import Joi from "joi";
import { RequestHandler } from "express";
import { IEmployeeData } from "../../../interfaces/employee";

const createEmployeeSchema = Joi.object<IEmployeeData>({
  username: Joi.string().required().messages({
    "string.empty": "Username tidak boleh kosong",
    "any.required": "Username harus diisi",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "string.empty": "Email tidak boleh kosong",
    "any.required": "Email harus diisi",
  }),
  position: Joi.string().required().messages({
    "string.empty": "Posisi tidak boleh kosong",
    "any.required": "Posisi harus diisi",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password minimal 6 karakter",
    "string.empty": "Password tidak boleh kosong",
    "any.required": "Password harus diisi",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Nomor telepon tidak boleh kosong",
    "any.required": "Nomor telepon harus diisi",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "Jenis kelamin tidak boleh kosong",
    "any.required": "Jenis kelamin harus diisi",
  }),
  age: Joi.string().required().messages({
    "string.empty": "Usia tidak boleh kosong",
    "any.required": "Usia harus diisi",
  }),
  education: Joi.string().required().messages({
    "string.empty": "Pendidikan tidak boleh kosong",
    "any.required": "Pendidikan harus diisi",
  }),
  skill: Joi.string().required().messages({
    "string.empty": "Usia tidak boleh kosong",
    "any.required": "Usia harus diisi",
  }),
  experience: Joi.string().optional(),
  leadership: Joi.string().optional(),
  // id, createdAt, updatedAt biasanya ditangani secara otomatis oleh DB
});

export const validateCreateEmployee: RequestHandler = (req, res, next) => {
  const requestUser = {
    ...req.body,
    isMale: req.body.gender === "male" ? true : false,
  };

  const { error } = createEmployeeSchema.validate(requestUser, {
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
  skill: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  phone: Joi.string().optional(),
  gender: Joi.string().optional(),
  age: Joi.string().optional(),
  education: Joi.string().optional(),
  experience: Joi.string().optional(),
  leadership: Joi.string().optional(),
  position: Joi.string().optional(),
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
