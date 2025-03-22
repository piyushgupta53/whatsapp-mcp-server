import { unknown } from "zod";
import { getSession } from "../session";
import axios from "axios";

export const createGroupTool = {
  name: "create_group",
  description: "Create a new Whatsapp group",
  handler: async ({ sessionId, groupName, participants }: any) => {
    const session = getSession(sessionId);

    if (!session) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Session '${sessionId} not found.`,
          },
        ],
      };
    }

    try {
      const url = `https://api.green-api.com/waInstance${session.instanceId}/createGroup/${session.apiTokenInstance}`;
      const res = await axios.post(url, {
        groupName,
        participants,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ Group created: ${res.data?.chatId || "unknown"}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Failed to create group: ${error.message}`,
          },
        ],
      };
    }
  },
};
