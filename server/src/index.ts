import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import createError from "http-errors";

import "./helpers/init_mongodb";
import "./helpers/init_redis";

import authRoute from "./routes/user.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {});
app.use("/auth", authRoute);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

const errorMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("listening to port" + PORT);
});
