"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const validate_1 = require("../validate");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/", (0, validate_1.validate)({ body: validate_1.userSchema }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield req.body;
    prisma.user.create({
        data: user,
    });
}));
router.put("/:id", (0, validate_1.validate)({ body: validate_1.userSchema }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = router;
//# sourceMappingURL=usersRoute.js.map