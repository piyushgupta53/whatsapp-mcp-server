import { getSession } from "../session";
import axios from "axios";
import { formatErrorResponse } from "../utils/errors";

export const getChatsTool = {
  name: "get_chats",
  description: "Get a list of recent Whatsapp chats",
  handler: async ({ sessionId }: any) => {
    const session = getSession(sessionId);
    if (!session) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Session '${sessionId} not found.'`,
          },
        ],
      };
    }

    try {
      const url = `https://api.green-api.com/waInstance${session.instanceId}/getChats/${session.apiTokenInstance}`;
      const res = await axios.get(url);

      const chatSummaries = res.data.map((chat: any) => ({
        name: chat.name,
        id: chat.id,
        type: chat.chatType,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: `📋 Chats:\n${chatSummaries
              .map((c: any) => `• ${c.name} (${c.id}) [${c.type}]`)
              .join("\n")}`,
          },
        ],
      };
    } catch (error: any) {
      return formatErrorResponse(error, "Get chats");
    }
  },
};
