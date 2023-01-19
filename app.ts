import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  prisma.user
    .findMany()
    .then((user) => {
      res.json(user);
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      await prisma.$disconnect();

      process.exit(1);
    });
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
