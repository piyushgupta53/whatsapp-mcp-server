"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSession = setSession;
exports.getSession = getSession;
// Simple in-memory store for sessions
var sessionStore = new Map();
function setSession(sessionId, data) {
    sessionStore.set(sessionId, data);
}
function getSession(sessionId) {
    return sessionStore.get(sessionId);
}
