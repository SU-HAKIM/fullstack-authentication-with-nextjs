import express from "express";
import {
  loginUser,
  logoutUser,
  refreshTokenController,
  registerUser,
} from "../controllers/user.controllers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshTokenController);
router.delete("/logout", logoutUser);

export default router;
