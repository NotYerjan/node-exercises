import "dotenv/config";
import config from "./config";
import express from "express";
import cors from "cors";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import usersRoute from "./routes/usersRoute";
import avatarRoute from "./routes/avatarRoute";
import authRoutes from "./routes/auth";
import { initSessionMiddleware } from "./middleware/session";
import { passport } from "./middleware/passport";

const app = express();
const PORT = config.PORT;
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors(corsOptions));

app.use("/users", usersRoute);
app.use("/avatar", avatarRoute);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
