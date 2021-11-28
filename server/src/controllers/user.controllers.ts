import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import client from "../helpers/init_redis";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helper";
import {
  validateLoginData,
  validateRegisterData,
} from "../helpers/validationSchema";
import User from "../models/user.model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
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
    const result = await validateLoginData.validateAsync(req.body);
    const oldUser = await User.findOne({ email: result.email });
    if (!oldUser) throw new createError.NotFound(`User is not registered.`);
    const isRightPassword = await oldUser.validatePassword(result.password);
    if (!isRightPassword) throw new createError.Unauthorized();
    const accessToken = await signAccessToken(String(oldUser._id));
    const refreshToken = await signRefreshToken(String(oldUser._id));
    res.send({ accessToken, refreshToken });
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
    let { refreshToken } = req.body;
    if (!refreshToken) throw new createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const val = await client.DEL(userId as string);
    console.log(val);
    res.sendStatus(204);
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
    let { refreshToken } = req.body;
    if (!refreshToken) throw new createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(String(userId));
    const newRefreshToken = await signRefreshToken(String(userId));

    res.send({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
