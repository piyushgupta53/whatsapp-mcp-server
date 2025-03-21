# WhatsApp MCP Server

A WhatsApp server implementation using the Model Context Protocol (MCP) SDK. This server provides a standardized interface for interacting with WhatsApp through the GreenAPI service.

## Features

- WhatsApp session management
- Integration with GreenAPI service
- Standardized MCP protocol implementation
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GreenAPI account and credentials

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd whatsapp-mcp-server
```

2. Install dependencies:

```bash
npm install
```

## Configuration

The server requires the following environment variables:

- `GREENAPI_API_URL`: The base URL for GreenAPI service
- `GREENAPI_API_TOKEN`: Your GreenAPI API token

## Usage

1. Start the server:

```bash
npm start
```

2. The server will start listening for MCP protocol messages through standard input/output.

## Available Tools

### Open Session

Opens a new WhatsApp session using GreenAPI credentials.

Parameters:

- `sessionId`: A unique session ID
- `instanceId`: GreenAPI instance ID
- `apiTokenInstance`: GreenAPI API token

## Development

The project is structured as follows:

```
src/
  ├── index.ts           # Main server entry point
  ├── tools/            # MCP tools implementation
  │   └── openSession.ts # WhatsApp session management tool
  └── types/            # TypeScript type definitions
```

## License
