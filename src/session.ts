type SessionData = {
  instanceId: string;
  apiTokenInstance: string;
};

// Simple in-memory store for sessions
const sessionStore = new Map<string, SessionData>();

export function setSession(sessionId: string, data: SessionData) {
  sessionStore.set(sessionId, data);
}

export function getSession(sessionId: string): SessionData | undefined {
  return sessionStore.get(sessionId);
}
