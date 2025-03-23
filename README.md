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

### Send Message

Sends a message to a specified chat.

Parameters:

- `sessionId`: Session ID from open_session
- `chatId`: Recipient chat ID (e.g., 1234567890@c.us or group@g.us)
- `message`: The message to send

### Get Chats

Retrieves the list of available chats.

Parameters:

- `sessionId`: Session ID from open_session

### Create Group

Creates a new WhatsApp group.

Parameters:

- `sessionId`: Session ID from open_session
- `groupName`: Name of the group to create
- `participants`: Array of phone numbers with domain (e.g. 12345@c.us)

### Get Chat History

Retrieves recent messages from a specified chat (personal or group).

Parameters:

- `sessionId`: Session ID from open_session
- `chatId`: Chat ID to retrieve messages from (e.g., 1234567890@c.us or group@g.us)
- `count`: Number of messages to retrieve (default: 50)

> **Important**: To receive incoming messages in the chat history, you need to enable the "Receive webhooks on incoming messages and files" setting using the SetSettings method or through the GreenAPI console. Without this setting enabled, the chat history will only show outgoing messages.

### Send File

Sends a file to a specified chat.

Parameters:

- `sessionId`: Session ID from open_session
- `chatId`: WhatsApp chat ID (e.g., 1234567890@c.us)
- `fileUrl`: Public URL of the file to send
- `fileName`: (Optional) Name of the file as seen by recipient
- `caption`: (Optional) Caption text to display below the file

### Add Participant

Adds a participant to an existing WhatsApp group.

Parameters:

- `sessionId`: Session ID from open_session
- `groupId`: ID of the WhatsApp group (e.g., group@g.us)
- `participantChatId`: Chat ID of the participant to add (e.g., 1234567890@c.us)

### Remove Participant

Removes a participant from an existing WhatsApp group.

Parameters:

- `sessionId`: Session ID from open_session
- `groupId`: ID of the WhatsApp group (e.g., group@g.us)
- `participantChatId`: Chat ID of the participant to remove (e.g., 1234567890@c.us)
