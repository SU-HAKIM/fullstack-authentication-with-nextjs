import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createError from "http-errors";
import { formatter } from "../helpers/errorFormatter";
import client from "../helpers/init_redis";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helper";
import User from "../models/user.model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith(formatter);
  if (!errors.isEmpty()) {
    return res.json(errors.mapped());
  }
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    const accessToken = await signAccessToken(String(savedUser._id));
    const refreshToken = await signRefreshToken(String(savedUser._id));
    console.log(savedUser._id);
    console.log(refreshToken, "refreshToken");
    res
      .status(200)
      .json({ registered: true, tokens: { accessToken, refreshToken } });
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
  console.log(req.body);
  const errors = validationResult(req).formatWith(formatter);
  if (!errors.isEmpty()) {
    return res.json({ error: true, messages: errors.mapped() });
  }
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    const accessToken = await signAccessToken(String(oldUser._id));
    const refreshToken = await signRefreshToken(String(oldUser._id));
    res.status(200).json({
      message: "user logged in",
      error: false,
      tokens: { accessToken, refreshToken },
    });
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
    console.log(refreshToken);
    if (!refreshToken) return res.send({ error: new createError.BadRequest() });
    const userId = await verifyRefreshToken(refreshToken);
    if (typeof userId !== typeof "") {
      console.log("user error");
      return res.send(userId);
    }
    console.log(userId, "log out user id");
    const val = await client.DEL(userId as string);
    console.log(val);
    res.status(204).json({ loggedOut: true });
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
    console.log(refreshToken, "generate rt");
    if (!refreshToken)
      return res.send({ error: true, message: new createError.BadRequest() });
    const userId = await verifyRefreshToken(refreshToken);
    console.log(userId, "userId");
    if (typeof userId !== typeof "") {
      console.log("user error");
      return res.send({ error: true, message: userId });
    }
    const accessToken = await signAccessToken(String(userId));
    const newRefreshToken = await signRefreshToken(String(userId));

    res.status(200).send({
      error: false,
      tokens: { accessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
