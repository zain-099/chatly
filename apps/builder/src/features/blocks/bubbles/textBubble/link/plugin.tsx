import { LinkPlugin } from "@typebot.io/rich-text/plate/link/react";
import { LinkFloatingToolbar } from "./components/LinkFloatingToolbar";
import { LinkNode } from "./components/LinkNode";

export const linkPlugin = LinkPlugin.configure({
  render: {
    node: LinkNode,
    afterEditable: () => <LinkFloatingToolbar />,
  },
  options: {
    forceSubmit: true,
  },
});
