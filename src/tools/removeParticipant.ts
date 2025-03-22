import { getSession } from "../session.js";
import { removeGroupParticipant } from "../greenapi.js";
import { formatErrorResponse } from "../utils/errors.js";

export const removeParticipantTool = {
  name: "remove_participant",
  description: "Remove a user from a WhatsApp group",
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
      const result = await removeGroupParticipant(
        session.instanceId,
        session.apiTokenInstance,
        groupId,
        participantChatId
      );

      const success = result?.removeParticipant === true;
      return {
        content: [
          {
            type: "text" as const,
            text: success
              ? `✅ Removed ${participantChatId} from ${groupId}.`
              : `⚠️ Could not remove participant. Maybe they're not in the group.`,
          },
        ],
      };
    } catch (error: any) {
      return formatErrorResponse(error, "Remove participant");
    }
  },
};
