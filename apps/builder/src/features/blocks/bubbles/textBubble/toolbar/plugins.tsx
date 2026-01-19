import { createPlatePlugin } from "@typebot.io/rich-text/plate/react";
import { FloatingToolbar } from "./components/FloatingToolbar";

export const floatingToolbarPlugin = createPlatePlugin({
  key: "floating-toolbar",
  render: {
    afterEditable: () => <FloatingToolbar />,
  },
});
