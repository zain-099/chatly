import type { ContinueChatResponse } from "@typebot.io/chat-api/schemas";
import { env } from "@typebot.io/env";
import { defaultBackgroundColor } from "@typebot.io/theme/constants";
import dynamic from "next/dynamic";
import { useEditor } from "@/features/editor/providers/EditorProvider";
import { useTypebot } from "@/features/editor/providers/TypebotProvider";
import { useGraph } from "@/features/graph/providers/GraphProvider";
import { useUser } from "@/features/user/hooks/useUser";
import { toast } from "@/lib/toast";

// Dynamic import with SSR disabled to avoid hydration issues with Solid.js web components
const Standard = dynamic(
  () => import("@typebot.io/react").then((mod) => mod.Standard),
  { ssr: false },
);

export const WebPreview = () => {
  const { user } = useUser();
  const { typebot } = useTypebot();
  const { startPreviewFrom } = useEditor();
  const { setPreviewingBlock } = useGraph();

  const handleNewLogs = (logs: ContinueChatResponse["logs"]) => {
    logs?.forEach((log) => {
      toast({
        title: log.context,
        type: log.status as "success" | "error" | "info",
        description: log.description,
        details: log.details,
      });
      if (log.status === "error") console.error(log);
    });
  };

  if (!typebot) return null;

  return (
    <Standard
      key={`web-preview-${startPreviewFrom?.id ?? ""}`}
      typebot={typebot}
      apiHost={env.NEXT_PUBLIC_VIEWER_URL[0]}
      sessionId={user ? `${typebot.id}-${user.id}` : undefined}
      startFrom={
        startPreviewFrom?.type === "group"
          ? { type: "group", groupId: startPreviewFrom.id }
          : startPreviewFrom?.type === "event"
            ? { type: "event", eventId: startPreviewFrom.id }
            : undefined
      }
      onNewInputBlock={(block) =>
        setPreviewingBlock({
          id: block.id,
          groupId:
            typebot.groups.find((g) => g.blocks.some((b) => b.id === block.id))
              ?.id ?? "",
        })
      }
      onNewLogs={handleNewLogs}
      style={{
        borderWidth: "1px",
        borderRadius: "0.25rem",
        backgroundColor:
          typebot.theme.general?.background?.content ??
          defaultBackgroundColor[typebot.version],
      }}
    />
  );
};
