"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorResponse = formatErrorResponse;
function formatErrorResponse(error, context) {
    var _a, _b, _c, _d;
    var err = error;
    var message = ((_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
        ((_d = (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) ||
        (err === null || err === void 0 ? void 0 : err.message) ||
        "Unknown error occurred";
    return {
        isError: true,
        content: [
            {
                type: "text",
                text: "\u274C ".concat(context, " failed: ").concat(message),
            },
        ],
    };
}
