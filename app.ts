import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Request, Response } from "express";
import { validate, userSchema, UserData } from "./validate";

const app = express();
const PORT = process.env.PORT;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post(
  "/users",
  validate({ body: userSchema }),
  async (req: Request, res: Response) => {
    const user: UserData = await req.body;
    prisma.user.create({
      data: user,
    });
  }
);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
