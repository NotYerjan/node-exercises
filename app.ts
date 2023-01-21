import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Request, Response } from "express";
import { validate, userSchema, UserData } from "./validate";
import cors from "cors";
import { initMulterMiddleware } from "./middleware/multer";
import path from "path";
import expressLayouts from "express-ejs-layouts";

const app = express();
const PORT = process.env.PORT;
const prisma = new PrismaClient();
const corsOptions = {
  origin: "http://localhost:8080",
};
const upload = initMulterMiddleware();

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors(corsOptions));

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

app.get("/avatar/upload", (req: Request, res: Response) => {
  res.render("index");
});

app.post(
  "/avatar",
  upload.single("avatar"),
  async (req: Request, res: Response, next: any) => {
    if (!req.file) {
      res.status(400);
      return next("No file uploaded");
    }

    const imageName = req.file.filename;

    res.status(201).json({ imageName });
  }
);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
