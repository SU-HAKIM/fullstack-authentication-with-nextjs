import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { signAccessToken, signRefreshToken } from "../helpers/jwt_helper";
import { validateRegisterData } from "../helpers/validationSchema";
import User from "../models/user.model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await validateRegisterData.validateAsync(req.body);
    const oldUser = await User.findOne({ email: result.email });
    if (oldUser)
      throw new createError.Conflict(`${result.email} is already registered.`);
    const newUser = new User(result);
    const savedUser = await newUser.save();
    const accessToken = await signAccessToken(String(savedUser._id));
    const refreshToken = await signRefreshToken(String(savedUser._id));
    res.send({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
