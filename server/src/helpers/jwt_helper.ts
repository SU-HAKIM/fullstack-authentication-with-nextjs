import jwt from "jsonwebtoken";
import createError from "http-errors";
import dotenv from "dotenv";
import client from "./init_redis";

dotenv.config();

export const signAccessToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: "5m", issuer: "", audience: userId };
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY;
    const payload = {};
    jwt.sign(payload, secret as string, options, (err, token) => {
      if (err) {
        console.log(err);
        return reject(new createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

export const signRefreshToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: "1y", issuer: "", audience: userId };
    const secret = process.env.REFRESH_TOKEN_SECRET_KEY;
    const payload = {};
    jwt.sign(payload, secret as string, options, (err, token) => {
      if (err) {
        console.log(err);
        return reject(new createError.InternalServerError());
      }
      client
        .set(userId, token as string, { EX: 365 * 24 * 60 * 60 })
        .then(() => {
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
