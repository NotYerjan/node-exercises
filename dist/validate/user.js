"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.userSchema = typebox_1.Type.Object({
    user_name: typebox_1.Type.String(),
    email: typebox_1.Type.RegEx(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/),
}, { additionalProperties: false });
//# sourceMappingURL=user.js.map