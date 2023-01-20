import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json, urlencoded } from "body-parser";

import { api } from "./api/routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.disable('x-powered-by')

api(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("RUNNING on " + PORT));
