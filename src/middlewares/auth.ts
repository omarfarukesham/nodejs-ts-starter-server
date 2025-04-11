import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import User from "../module/user/user.model";
import { TUserRole } from "../module/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("You are not authorized!");
    }

    const getToken = token.split(" ")[1];
    const decoded = jwt.verify(getToken, "primarytestkey") as JwtPayload;

    const { role, email, id } = decoded;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("This user is not found !");
    }

    const userStatus = user?.isBlocked;

    if (userStatus === true) {
      throw new Error("This user is blocked !!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error("You are not authorized");
    }

    req.user = decoded as JwtPayload;
    // console.log(req.user)
    next();
  });
};

export default auth;
