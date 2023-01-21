import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { validate, userSchema, UserData } from "../validate";

const router = Router();

const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get("/:id", async (req: Request, res: Response, next: any) => {
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

router.post(
  "/",
  validate({ body: userSchema }),
  async (req: Request, res: Response) => {
    const user: UserData = await req.body;
    prisma.user.create({
      data: user,
    });
  }
);

router.put(
  "/:id",
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

router.delete("/:id", async (req: Request, res: Response, next: any) => {
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

export default router;
