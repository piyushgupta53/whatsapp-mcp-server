import { getSession } from "../session";
import { sendMessageToWhatsapp } from "../greenapi";
import { formatErrorResponse } from "../utils/errors";

export const sendMessageTool = {
  name: "send_message",
  description: "Send a WhatsApp message using GreenAPI",
  handler: async ({ sessionId, chatId, message }: any) => {
    const session = getSession(sessionId);

    if (!session) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Session ${sessionId} not found. Please call open_session first.`,
          },
        ],
      };
    }

    try {
      const result = await sendMessageToWhatsapp(
        session.instanceId,
        session.apiTokenInstance,
        chatId,
        message
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ Message sent to ${chatId}. Response ID: ${
              result?.idMessage || "N/A"
            }`,
          },
        ],
      };
    } catch (error: any) {
      return formatErrorResponse(error, "Send message");
    }
  },
};
