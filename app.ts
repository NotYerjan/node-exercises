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

app.get("/user/:id", async (req, res, next) => {
  const userId = Number(req.params.id);

  const laboratory = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!laboratory) {
    res.status(404);
    return next(`Cannot GET /laboratories/${userId}`);
  }

  res.json(laboratory);
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

app.put(
  "/users/:id",
  validate({ body: userSchema }),
  async (req: Request, res: Response, next: any) => {
    const userId = Number(req.params.id);
    const updatedUser: UserData = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: updatedUser,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(404);
      next(`Cannot PUT /laboratories/${userId}`);
    }
  }
);

app.delete("/user/:id", async (req: Request, res: Response, next: any) => {
  const userId = Number(req.params.id);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(204).end();
  } catch (error) {
    res.status(404);
    next(`Cannot DELETE /laboratories/${userId}`);
  }
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
