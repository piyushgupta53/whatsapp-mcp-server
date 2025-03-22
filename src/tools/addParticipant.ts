import { getSession } from "../session.js";
import { addGroupParticipant } from "../greenapi.js";

export const addParticipantTool = {
  name: "add_participant",
  description: "Add a user to a WhatsApp group",
  handler: async ({ sessionId, groupId, participantChatId }: any) => {
    const session = getSession(sessionId);

    if (!session) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Session '${sessionId}' not found.`,
          },
        ],
      };
    }

    try {
      const result = await addGroupParticipant(
        session.instanceId,
        session.apiTokenInstance,
        groupId,
        participantChatId
      );

      const success = result?.addParticipant === true;
      return {
        content: [
          {
            type: "text" as const,
            text: success
              ? `✅ Added ${participantChatId} to ${groupId}.`
              : `⚠️ Could not add participant. Maybe they're already in the group.`,
          },
        ],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `❌ Error: ${err?.response?.data?.message || err.message}`,
          },
        ],
      };
    }
  },
};
