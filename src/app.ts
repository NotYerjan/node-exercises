import "dotenv/config";
import config from "./config";
import express from "express";
import cors from "cors";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import usersRoute from "./routes/usersRoute";
import avatarRoute from "./routes/avatarRoute";

const app = express();
const PORT = config.PORT;
const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors(corsOptions));

app.use("/users", usersRoute);
app.use("/avatar", avatarRoute);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
