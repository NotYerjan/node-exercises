import { Router } from "express";
import { Request, Response } from "express";
import { initMulterMiddleware } from "../middleware/multer";

const upload = initMulterMiddleware();

const router = Router();

router.get("/avatar/upload", (req: Request, res: Response) => {
  res.render("index");
});

router.post(
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

export default router;
