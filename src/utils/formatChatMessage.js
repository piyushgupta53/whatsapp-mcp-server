"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatChatMessage = formatChatMessage;
function formatChatMessage(msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var sender = msg.type === "incoming"
        ? msg.senderName || msg.senderId || "Unknown"
        : "You";
    var time = new Date(msg.timestamp * 1000).toLocaleString();
    var prefix = "[".concat(msg.type.toUpperCase(), "] ").concat(sender, " @ ").concat(time);
    switch (msg.typeMessage) {
        case "textMessage":
            return "".concat(prefix, ": ").concat(msg.textMessage);
        case "extendedTextMessage":
            return "".concat(prefix, ": ").concat(((_a = msg.extendedTextMessage) === null || _a === void 0 ? void 0 : _a.text) || "").concat(((_b = msg.extendedTextMessage) === null || _b === void 0 ? void 0 : _b.title)
                ? "\n\u21AA ".concat(msg.extendedTextMessage.title)
                : "").concat(((_c = msg.extendedTextMessage) === null || _c === void 0 ? void 0 : _c.description)
                ? "\n\uD83D\uDD17 ".concat(msg.extendedTextMessage.description)
                : "");
        case "imageMessage":
        case "videoMessage":
        case "documentMessage":
        case "audioMessage":
        case "stickerMessage": {
            var type = msg.typeMessage.replace("Message", "").toUpperCase();
            return "".concat(prefix, ": \uD83D\uDCCE ").concat(type, " - ").concat(msg.caption || "", "\n\uD83D\uDCE5 ").concat(msg.downloadUrl || "[No URL]");
        }
        case "locationMessage":
            return "".concat(prefix, ": \uD83D\uDCCD Location: ").concat(((_d = msg.location) === null || _d === void 0 ? void 0 : _d.nameLocation) || "Unnamed", " (").concat((_e = msg.location) === null || _e === void 0 ? void 0 : _e.latitude, ", ").concat((_f = msg.location) === null || _f === void 0 ? void 0 : _f.longitude, ")\n\uD83C\uDFE0 ").concat(((_g = msg.location) === null || _g === void 0 ? void 0 : _g.address) || "");
        case "contactMessage":
            return "".concat(prefix, ": \uD83D\uDC64 Contact shared - ").concat(((_h = msg.contact) === null || _h === void 0 ? void 0 : _h.displayName) || "Unnamed contact");
        case "reactionMessage":
            return "".concat(prefix, ": \u2764\uFE0F Reacted with \"").concat(((_j = msg.extendedTextMessageData) === null || _j === void 0 ? void 0 : _j.text) || "?", "\"");
        case "pollMessage": {
            var options = ((_l = (_k = msg.pollMessageData) === null || _k === void 0 ? void 0 : _k.options) === null || _l === void 0 ? void 0 : _l.map(function (o) { return "\u2022 ".concat(o.optionName); }).join("\n")) || "";
            return "".concat(prefix, ": \uD83D\uDDF3\uFE0F Poll - ").concat(((_m = msg.pollMessageData) === null || _m === void 0 ? void 0 : _m.name) || "Untitled", "\n").concat(options);
        }
        case "pollUpdateMessage": {
            var updates = ((_p = (_o = msg.pollMessageData) === null || _o === void 0 ? void 0 : _o.votes) === null || _p === void 0 ? void 0 : _p.map(function (vote) {
                return "\u2022 ".concat(vote.optionName, ": ").concat(vote.optionVoters.join(", ") || "No votes");
            }).join("\n")) || "";
            return "".concat(prefix, ": \u2705 Poll Update - ").concat(((_q = msg.pollMessageData) === null || _q === void 0 ? void 0 : _q.name) || "Unnamed", "\n").concat(updates);
        }
        case "quotedMessage": {
            var quoted = msg.quotedMessage;
            var quotedSummary = "[Quoted message]";
            if ((quoted === null || quoted === void 0 ? void 0 : quoted.typeMessage) === "pollMessage") {
                quotedSummary = "\uD83D\uDDF3\uFE0F Poll: ".concat((_r = quoted.pollMessageData) === null || _r === void 0 ? void 0 : _r.name);
            }
            else {
                quotedSummary =
                    (quoted === null || quoted === void 0 ? void 0 : quoted.caption) || (quoted === null || quoted === void 0 ? void 0 : quoted.text) || (quoted === null || quoted === void 0 ? void 0 : quoted.fileName) || "[media]";
            }
            return "".concat(prefix, ": \"").concat(((_s = msg.extendedTextMessage) === null || _s === void 0 ? void 0 : _s.text) || "", "\"\n\u21AA ").concat(quotedSummary);
        }
        case "deletedMessage":
            return "".concat(prefix, ": \u274C Deleted a message (ID: ").concat(((_t = msg.deletedMessageData) === null || _t === void 0 ? void 0 : _t.stanzaId) || "unknown", ")");
        default:
            return "".concat(prefix, ": [Unsupported message type: ").concat(msg.typeMessage, "]");
    }
}
