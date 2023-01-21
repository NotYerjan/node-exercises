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
const multer_1 = require("../middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const router = (0, express_1.Router)();
router.get("/avatar/upload", (req, res) => {
    res.render("index");
});
router.post("/avatar", upload.single("avatar"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400);
        return next("No file uploaded");
    }
    const imageName = req.file.filename;
    res.status(201).json({ imageName });
}));
exports.default = router;
//# sourceMappingURL=avatarRoute.js.map