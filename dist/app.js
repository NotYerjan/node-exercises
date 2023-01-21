"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const validate_1 = require("./validate");
const cors_1 = __importDefault(require("cors"));
const multer_1 = require("./middleware/multer");
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const prisma = new client_1.PrismaClient();
const corsOptions = {
    origin: "http://localhost:8080",
};
const upload = (0, multer_1.initMulterMiddleware)();
app.use(express_ejs_layouts_1.default);
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
app.get("/user/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    const laboratory = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!laboratory) {
        res.status(404);
        return next(`Cannot GET /laboratories/${userId}`);
    }
    res.json(laboratory);
}));
app.post("/users", (0, validate_1.validate)({ body: validate_1.userSchema }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield req.body;
    prisma.user.create({
        data: user,
    });
}));
app.put("/users/:id", (0, validate_1.validate)({ body: validate_1.userSchema }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    const updatedUser = req.body;
    try {
        const user = yield prisma.user.update({
            where: { id: userId },
            data: updatedUser,
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404);
        next(`Cannot PUT /laboratories/${userId}`);
    }
}));
app.delete("/user/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    try {
        yield prisma.user.delete({
            where: { id: userId },
        });
        res.status(204).end();
    }
    catch (error) {
        res.status(404);
        next(`Cannot DELETE /laboratories/${userId}`);
    }
}));
app.get("/avatar/upload", (req, res) => {
    res.render("index");
});
app.post("/avatar", upload.single("avatar"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400);
        return next("No file uploaded");
    }
    const imageName = req.file.filename;
    res.status(201).json({ imageName });
}));
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map