import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { openSessionTool } from "./tools/openSession";
import { z } from "zod";
import { sendMessageTool } from "./tools/sendMessage";
import { getChatsTool } from "./tools/getChats";
import { createGroupTool } from "./tools/createGroup";

async function main() {
  const server = new McpServer({
    name: "whatsapp-server",
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

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("✅ MCP WhatsApp Server is running...");
}

main().catch((error) => {
  console.error("❌ Server failed to start:", error);
});
