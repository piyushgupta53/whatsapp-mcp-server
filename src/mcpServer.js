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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMcpServer = createMcpServer;
var zod_1 = require("zod");
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
var allTools_js_1 = require("./tools/allTools.js");
function createMcpServer() {
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
            server = new mcp_js_1.McpServer({
                name: "whatsapp-mcp-server",
                version: "1.0.0",
            });
            // register the open_session tool
            server.tool(allTools_js_1.openSessionTool.name, allTools_js_1.openSessionTool.description, {
                sessionId: zod_1.z.string().describe("A unique session ID"),
                instanceId: zod_1.z.string().describe("GreenAPI instance ID"),
                apiTokenInstance: zod_1.z.string().describe("GreenAPI API token"),
            }, allTools_js_1.openSessionTool.handler);
            // register send_message tool
            server.tool(allTools_js_1.sendMessageTool.name, allTools_js_1.sendMessageTool.description, {
                sessionId: zod_1.z.string().describe("Session ID from open_session"),
                chatId: zod_1.z
                    .string()
                    .describe("Recipient chat ID (e.g., 1234567890@c.us or group@g.us)"),
                message: zod_1.z.string().describe("The message to send"),
            }, allTools_js_1.sendMessageTool.handler);
            // register get_chats tool
            server.tool(allTools_js_1.getChatsTool.name, allTools_js_1.getChatsTool.description, {
                sessionId: zod_1.z.string().describe("Session ID from open_session"),
            }, allTools_js_1.getChatsTool.handler);
            // register create_group tool
            server.tool(allTools_js_1.createGroupTool.name, allTools_js_1.createGroupTool.description, {
                sessionId: zod_1.z.string(),
                groupName: zod_1.z.string(),
                participants: zod_1.z
                    .array(zod_1.z.string())
                    .describe("Array of phone numbers with domain (e.g. 12345@c.us)"),
            }, allTools_js_1.createGroupTool.handler);
            // register get_chat_history tool
            server.tool(allTools_js_1.getChatHistoryTool.name, allTools_js_1.getChatHistoryTool.description, {
                sessionId: zod_1.z.string().describe("Session ID from open_session"),
                chatId: zod_1.z
                    .string()
                    .describe("Chat ID (e.g., 1234567890@c.us or group@g.us)"),
                count: zod_1.z
                    .number()
                    .optional()
                    .describe("Number of messages to retrieve (default 50)"),
            }, allTools_js_1.getChatHistoryTool.handler);
            //register send_file tool
            server.tool(allTools_js_1.sendFileTool.name, allTools_js_1.sendFileTool.description, {
                sessionId: zod_1.z.string(),
                chatId: zod_1.z.string().describe("WhatsApp chat ID (e.g., 1234567890@c.us)"),
                fileUrl: zod_1.z.string().url().describe("Public URL of the file to send"),
                fileName: zod_1.z
                    .string()
                    .optional()
                    .describe("Name of the file as seen by recipient"),
                caption: zod_1.z
                    .string()
                    .optional()
                    .describe("Optional caption below the file"),
            }, allTools_js_1.sendFileTool.handler);
            // register add_participant tool
            server.tool(allTools_js_1.addParticipantTool.name, allTools_js_1.addParticipantTool.description, {
                sessionId: zod_1.z.string(),
                groupId: zod_1.z.string(),
                participantChatId: zod_1.z.string(),
            }, allTools_js_1.addParticipantTool.handler);
            // register remove_participant tool
            server.tool(allTools_js_1.removeParticipantTool.name, allTools_js_1.removeParticipantTool.description, {
                sessionId: zod_1.z.string(),
                groupId: zod_1.z.string(),
                participantChatId: zod_1.z.string(),
            }, allTools_js_1.removeParticipantTool.handler);
            return [2 /*return*/, server];
        });
    });
}
