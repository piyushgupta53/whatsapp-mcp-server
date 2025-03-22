import express, { RequestHandler } from "express";
import bodyParser from "body-parser";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createMcpServer } from "./mcpServer.js";

const app = express();
const port = parseInt(process.env.PORT || "3001", 10);

app.use(bodyParser.json());

let transport: SSEServerTransport;

app.get("/sse", (async (req, res) => {
  try {
    const server = await createMcpServer();
    transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
    res.flushHeaders();
    console.log("✅ SSE connected.");
  } catch (error) {
    console.error("Error in /sse route:", error);
    res.status(500).send("Internal Server Error");
  }
}) as RequestHandler);

app.post("/messages", (async (req, res) => {
  if (!transport) {
    console.warn("⚠️ POST /messages called before SSE transport initialized.");
    return res.status(400).json({ error: "SSE not yet connected" });
  }

  try {
    await transport.handlePostMessage(req, res);
  } catch (err) {
    console.error("❌ Error handling message:", err);
    res.status(500).send("Message processing failed");
  }
}) as RequestHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 MCP server listening at http://localhost:${port}`);
});
