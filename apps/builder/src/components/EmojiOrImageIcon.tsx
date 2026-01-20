import { isSvgSrc } from "@typebot.io/lib/utils";
import { cx } from "@typebot.io/ui/lib/cva";
import type { JSX } from "react";

type Props = {
  icon?: string | null;
  size?: "sm" | "md" | "lg";
  defaultIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const EmojiOrImageIcon = ({ icon, size = "md", defaultIcon }: Props) => {
  // Defensive: ensure icon is a string to prevent "Cannot convert object to primitive value"
  const safeIcon = typeof icon === "string" ? icon : null;
  return (
    <>
      {safeIcon ? (
        safeIcon.startsWith("http") || isSvgSrc(safeIcon) ? (
          <img
            className={cx(
              "rounded-[10%]",
              size === "sm" && "size-[18px]",
              size === "md" && "size-[25px]",
              size === "lg" && "size-[36px]",
              isSvgSrc(safeIcon) ? undefined : "object-cover",
            )}
            src={safeIcon}
            alt="typebot icon"
          />
        ) : (
          <span
            role="img"
            className={cx(
              size === "sm" && "text-xl",
              size === "md" && "text-2xl",
              size === "lg" && "text-[2.25rem]",
            )}
          >
            {safeIcon}
          </span>
        )
      ) : (
        defaultIcon({
          className: cx(
            size === "sm" && "size-4!",
            size === "md" && "size-6!",
            size === "lg" && "size-9!",
          ),
        })
      )}
    </>
  );
};
