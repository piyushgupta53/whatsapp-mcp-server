import { setSession } from "../session";

export const openSessionTool = {
  name: "open_session",
  description:
    "Initialize a session with GreenAPI using instanceId and apiTokenInstance",
  handler: async (
    args: { sessionId: string; instanceId: string; apiTokenInstance: string },
    extra: unknown
  ) => {
    setSession(args.sessionId, {
      instanceId: args.instanceId,
      apiTokenInstance: args.apiTokenInstance,
    });

    return {
      content: [
        {
          type: "text" as const,
          text: `✅ GreenAPI session initialized for sessionId ${args.sessionId}`,
        },
      ],
    };
  },
};
