import { Express } from "express";
import { signIn, signUp } from "../controllers/sign-in-controller";

export const api = (app: Express) => {
  app.get("/", (req, res) => res.send('Wellcome'));
  app.post("/api/sign-in", signIn);
  app.post("/api/sign-up", signUp);
};
