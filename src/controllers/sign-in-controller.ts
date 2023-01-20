import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface User {
  email: string;
  password: string;
  username: string;
}

const users: User[] = [];

export const signIn = (req: Request, res: Response) => {
  try {
    const { email, password }: { email?: string; password?: string } = req.body;
    if (!email || !password) {
      throw { code: 400, message: "Missing email or password" };
    }

    const user = users.find((e) => e.email == email);
    if (!user) {
      throw { code: 404, message: "User not found" };
    }

    if (bcrypt.compareSync(password, user.password)) {
      const expiresIn = 60 * 60;
      const payload = { email, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
      res.send({ token, expiresIn, user: payload });
    } else {
      throw { code: 401, message: "invalid password" };
    }
  } catch (error: any) {
    res
      .status(error.code ?? 500)
      .send({ message: error.message ?? "unknown error" });
  }
};

export const signUp = (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      username,
    }: { email?: string; password?: string; username?: string } = req.body;
    if (!email || !password || !username) {
      throw { code: 400, message: "Missing data" };
    }

    const user = users.find((e) => e.email == email);
    if (user) {
      throw { code: 409, message: "Duplicated email" };
    }

    const newUser: User = {
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    };

    users.push(newUser);
    res.send({ message: "created" });
  } catch (error: any) {
    res
      .status(error.code ?? 500)
      .send({ message: error.message ?? "unknown error" });
  }
};
