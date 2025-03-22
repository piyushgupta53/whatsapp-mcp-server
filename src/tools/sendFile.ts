import { getSession } from "../session";
import { sendFileByUrl } from "../greenapi";

export const sendFileTool = {
  name: "send_file",
  description:
    "Send a file(image, doc, audio etc.) to a WhatsApp chat using a public URL.",
  handler: async ({ sessionId, chatId, fileUrl, fileName, caption }: any) => {
    const session = getSession(sessionId);

    if (!session) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Session '${sessionId}' not found. Please call open_session.`,
          },
        ],
        _meta: {},
      };
    }

    try {
      const result = await sendFileByUrl(
        session.instanceId,
        session.apiTokenInstance,
        chatId,
        fileUrl,
        fileName,
        caption
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ File sent to ${chatId}. Message ID: ${
              result.idMessage || "N/A"
            }`,
          },
        ],
        _meta: {},
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Failed to send file: ${
              error?.response?.data?.message || error.message
            }`,
          },
        ],
        _meta: {},
      };
    }
  },
};
