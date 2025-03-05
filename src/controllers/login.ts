import { LoginModel } from "../models";

export type payloadType = {
  email: string;
  password: string;
};
export type LoginModelResult = {
  id?: number;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

async function LoginController(payload: payloadType) {
  console.log("🚀 ~ LoginController ~ payload:", payload);
  try {
    const result = await LoginModel.findOne({
      where: { email: payload.email },
    });

    const dataStringify = JSON.stringify(result, null, 2);
    const dataParse = JSON.parse(dataStringify);

    if (!dataParse) {
      return {
        status: 404,
        message: "Account not found",
        data: null,
      };
    }

    if (dataParse && dataParse.password !== payload.password) {
      return {
        status: 400,
        message: "Invalid email or password",
        data: null,
      };
    }

    return {
      status: 201,
      message: "success",
      data: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
      data: undefined,
    };
  }
}

export default LoginController;
