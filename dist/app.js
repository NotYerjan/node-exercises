"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const avatarRoute_1 = __importDefault(require("./routes/avatarRoute"));
const app = (0, express_1.default)();
const PORT = config_1.default.PORT;
const corsOptions = {
    origin: "http://localhost:8080",
};
app.use(express_ejs_layouts_1.default);
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use("/users", usersRoute_1.default);
app.use("/avatar", avatarRoute_1.default);
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map