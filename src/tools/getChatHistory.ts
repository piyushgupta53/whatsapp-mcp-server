import { getChatHistory } from "../greenapi";
import { getSession } from "../session";
import axios from "axios";
import { formatChatMessage } from "../utils/formatChatMessage";

export const getChatHistoryTool = {
  name: "get_chat_history",
  description: "Get recent messages from a chat (personal or group)",
  handler: async ({
    sessionId,
    chatId,
    count = 50,
  }: {
    sessionId: string;
    chatId: string;
    count?: number;
  }) => {
    const session = getSession(sessionId);

    if (!session) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Session '${sessionId}' not found. Please call open_session first.`,
          },
        ],
      };
    }

    try {
      const history = await getChatHistory(
        session.instanceId,
        session.apiTokenInstance,
        chatId,
        count
      );

      if (!history || history.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `📭 No messages found for chat: ${chatId}`,
            },
          ],
        };
      }

      const formatted = history.map(formatChatMessage).join("\n\n");

      return {
        content: [{ type: "text" as const, text: formatted }],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Failed to retreive chat history: ${
              error?.response?.data?.message || error.message
            }`,
          },
        ],
      };
    }
  },
};
