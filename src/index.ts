import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { openSessionTool } from "./tools/openSession";
import { z } from "zod";
import { sendMessageTool } from "./tools/sendMessage";
import { getChatsTool } from "./tools/getChats";
import { createGroupTool } from "./tools/createGroup";
import { getChatHistoryTool } from "./tools/getChatHistory";
import { sendFileTool } from "./tools/sendFile";
import { addParticipantTool } from "./tools/addParticipant";
import { removeParticipantTool } from "./tools/removeParticipant";

async function main() {
  const server = new McpServer({
    name: "whatsapp-mcp-server",
    version: "1.0.0",
  });

  // register the open_session tool
  server.tool(
    openSessionTool.name,
    openSessionTool.description,
    {
      sessionId: z.string().describe("A unique session ID"),
      instanceId: z.string().describe("GreenAPI instance ID"),
      apiTokenInstance: z.string().describe("GreenAPI API token"),
    },
    openSessionTool.handler
  );

  // register send_message tool
  server.tool(
    sendMessageTool.name,
    sendMessageTool.description,
    {
      sessionId: z.string().describe("Session ID from open_session"),
      chatId: z
        .string()
        .describe("Recipient chat ID (e.g., 1234567890@c.us or group@g.us)"),
      message: z.string().describe("The message to send"),
    },
    sendMessageTool.handler
  );

  // register get_chats tool
  server.tool(
    getChatsTool.name,
    getChatsTool.description,
    {
      sessionId: z.string().describe("Session ID from open_session"),
    },
    getChatsTool.handler
  );

  // register create_group tool
  server.tool(
    createGroupTool.name,
    createGroupTool.description,
    {
      sessionId: z.string(),
      groupName: z.string(),
      participants: z
        .array(z.string())
        .describe("Array of phone numbers with domain (e.g. 12345@c.us)"),
    },
    createGroupTool.handler
  );

  // register get_chat_history tool
  server.tool(
    getChatHistoryTool.name,
    getChatHistoryTool.description,
    {
      sessionId: z.string().describe("Session ID from open_session"),
      chatId: z
        .string()
        .describe("Chat ID (e.g., 1234567890@c.us or group@g.us)"),
      count: z
        .number()
        .optional()
        .describe("Number of messages to retrieve (default 50)"),
    },
    getChatHistoryTool.handler
  );

  //register send_file tool
  server.tool(
    sendFileTool.name,
    sendFileTool.description,
    {
      sessionId: z.string(),
      chatId: z.string().describe("WhatsApp chat ID (e.g., 1234567890@c.us)"),
      fileUrl: z.string().url().describe("Public URL of the file to send"),
      fileName: z
        .string()
        .optional()
        .describe("Name of the file as seen by recipient"),
      caption: z
        .string()
        .optional()
        .describe("Optional caption below the file"),
    },
    sendFileTool.handler
  );

  // register add_participant tool
  server.tool(
    addParticipantTool.name,
    addParticipantTool.description,
    {
      sessionId: z.string(),
      groupId: z.string(),
      participantChatId: z.string(),
    },
    addParticipantTool.handler
  );

  // register remove_participant tool
  server.tool(
    removeParticipantTool.name,
    removeParticipantTool.description,
    {
      sessionId: z.string(),
      groupId: z.string(),
      participantChatId: z.string(),
    },
    removeParticipantTool.handler
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("✅ MCP WhatsApp Server is running...");
}

main().catch((error) => {
  console.error("❌ Server failed to start:", error);
});
