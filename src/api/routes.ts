import { Express } from "express";
import { signIn, signUp } from "../controllers/sign-in-controller";

export const api = (app: Express) => {
  app.post("/api/sign-in", signIn);
  app.post("/api/sign-up", signUp);
};
