import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../../helpers/handleCustomError";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  if (!result) {
    throw new CustomError("Failed to create user", 500);
  }
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    throw new CustomError("This user is not found!", 404, { field: "email" });
  }

  if (user.isBlocked) {
    throw new CustomError("This user is blocked!", 403);
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new CustomError("Invalid credentials", 401, { field: "password" });
  }

  const jwtPayload = {
    email: user.email,
    name: user.name,
    role: user.role,
    id: user._id.toString(),
  };
  // console.log("auth id setup ... ",jwtPayload)

  const token = jwt.sign(jwtPayload, "primarytestkey", { expiresIn: "10d" });

  return { token, user };
};

export const AuthService = {
  register,
  login,
};
