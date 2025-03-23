import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createMcpServer } from "./mcpServer.js";

const app = express();
const port = parseInt(process.env.PORT || "3001", 10);

// Enable CORS for all routes
app.use(cors());

// OPTIONAL: Add a simple health check route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Store transport instance
let transport: SSEServerTransport;

// Handle SSE connection (GET /sse)
app.get("/sse", async (req, res) => {
  console.log("➡️ Incoming /sse connection");
  try {
    const server = await createMcpServer();
    transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
    console.log("✅ SSE connected.");
    // NOTE: Do NOT end the response — SSE must stay open
  } catch (error) {
    console.error("❌ Error in /sse route:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle incoming MCP messages (POST /messages)
// Do NOT apply bodyParser.json() here — MCP SDK needs raw stream
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

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 MCP server listening at http://localhost:${port}`);
});
