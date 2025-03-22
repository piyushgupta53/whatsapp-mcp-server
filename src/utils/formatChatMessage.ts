export type MessageType =
  | "textMessage"
  | "extendedTextMessage"
  | "imageMessage"
  | "videoMessage"
  | "documentMessage"
  | "audioMessage"
  | "stickerMessage"
  | "locationMessage"
  | "contactMessage"
  | "reactionMessage"
  | "pollMessage"
  | "pollUpdateMessage"
  | "quotedMessage"
  | "deletedMessage"
  | string;

interface ChatMessage {
  idMessage: string;
  type: "incoming" | "outgoing";
  timestamp: number;
  typeMessage: MessageType;
  chatId: string;
  senderId?: string;
  senderName?: string;
  senderContactName?: string;
  sendByApi?: boolean;
  textMessage?: string;
  caption?: string;
  downloadUrl?: string;
  fileName?: string;
  mimeType?: string;
  location?: {
    nameLocation?: string;
    address?: string;
    latitude: number;
    longitude: number;
  };
  contact?: {
    displayName: string;
  };
  extendedTextMessage?: {
    text: string;
    description?: string;
    title?: string;
  };
  extendedTextMessageData?: {
    text: string;
  };
  pollMessageData?: {
    name: string;
    options?: { optionName: string }[];
    votes?: {
      optionName: string;
      optionVoters: string[];
    }[];
    multipleAnswers?: boolean;
    stanzaId?: string;
  };
  quotedMessage?: {
    typeMessage: MessageType;
    caption?: string;
    text?: string;
    fileName?: string;
    pollMessageData?: {
      name: string;
      options: { optionName: string }[];
    };
  };
  deletedMessageData?: {
    stanzaId: string;
  };
  isDeleted?: boolean;
}

export function formatChatMessage(msg: ChatMessage): string {
  const sender =
    msg.type === "incoming"
      ? msg.senderName || msg.senderId || "Unknown"
      : "You";
  const time = new Date(msg.timestamp * 1000).toLocaleString();
  const prefix = `[${msg.type.toUpperCase()}] ${sender} @ ${time}`;

  switch (msg.typeMessage) {
    case "textMessage":
      return `${prefix}: ${msg.textMessage}`;

    case "extendedTextMessage":
      return `${prefix}: ${msg.extendedTextMessage?.text || ""}${
        msg.extendedTextMessage?.title
          ? `\n↪ ${msg.extendedTextMessage.title}`
          : ""
      }${
        msg.extendedTextMessage?.description
          ? `\n🔗 ${msg.extendedTextMessage.description}`
          : ""
      }`;

    case "imageMessage":
    case "videoMessage":
    case "documentMessage":
    case "audioMessage":
    case "stickerMessage": {
      const type = msg.typeMessage.replace("Message", "").toUpperCase();
      return `${prefix}: 📎 ${type} - ${msg.caption || ""}\n📥 ${
        msg.downloadUrl || "[No URL]"
      }`;
    }

    case "locationMessage":
      return `${prefix}: 📍 Location: ${
        msg.location?.nameLocation || "Unnamed"
      } (${msg.location?.latitude}, ${msg.location?.longitude})\n🏠 ${
        msg.location?.address || ""
      }`;

    case "contactMessage":
      return `${prefix}: 👤 Contact shared - ${
        msg.contact?.displayName || "Unnamed contact"
      }`;

    case "reactionMessage":
      return `${prefix}: ❤️ Reacted with "${
        msg.extendedTextMessageData?.text || "?"
      }"`;

    case "pollMessage": {
      const options =
        msg.pollMessageData?.options
          ?.map((o) => `• ${o.optionName}`)
          .join("\n") || "";
      return `${prefix}: 🗳️ Poll - ${
        msg.pollMessageData?.name || "Untitled"
      }\n${options}`;
    }

    case "pollUpdateMessage": {
      const updates =
        msg.pollMessageData?.votes
          ?.map(
            (vote) =>
              `• ${vote.optionName}: ${
                vote.optionVoters.join(", ") || "No votes"
              }`
          )
          .join("\n") || "";
      return `${prefix}: ✅ Poll Update - ${
        msg.pollMessageData?.name || "Unnamed"
      }\n${updates}`;
    }

    case "quotedMessage": {
      const quoted = msg.quotedMessage;
      let quotedSummary = "[Quoted message]";
      if (quoted?.typeMessage === "pollMessage") {
        quotedSummary = `🗳️ Poll: ${quoted.pollMessageData?.name}`;
      } else {
        quotedSummary =
          quoted?.caption || quoted?.text || quoted?.fileName || "[media]";
      }

      return `${prefix}: "${
        msg.extendedTextMessage?.text || ""
      }"\n↪ ${quotedSummary}`;
    }

    case "deletedMessage":
      return `${prefix}: ❌ Deleted a message (ID: ${
        msg.deletedMessageData?.stanzaId || "unknown"
      })`;

    default:
      return `${prefix}: [Unsupported message type: ${msg.typeMessage}]`;
  }
}
