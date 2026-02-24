import { Tooltip } from "@mui/material";
import { Avatar as MUIAvatar } from "@mui/material";

import { ConditionalWrapper } from "@components/ConditionalWrapper";

import { AvatarProps } from "./Avatar.props";
import { AvatarWrapper } from "./Avatar.style";

/**
 * A component that renders a custom styled Avatar.
 *
 * @param name - used to provide alt to the Avatar Component for fallback.
 * @param src - path to the image.
 * @param handleClick - (optional) - function that defines how onClick is handled.
 * @param tooltipContent - (optional) - component that defines what do you wanna display inside a tooltip.
 */
export const Avatar = ({
  name,
  src,
  handleClick,
  toolTipContent,
  tooltipPosition = "bottom",
}: AvatarProps) => (
  <ConditionalWrapper
    condition={Boolean(handleClick)}
    wrapper={(children: React.ReactElement<unknown>) => (
      <AvatarWrapper onClick={handleClick}>{children}</AvatarWrapper>
    )}
  >
    <ConditionalWrapper
      condition={Boolean(toolTipContent)}
      wrapper={(children: React.ReactElement<unknown>) => (
        <Tooltip title={toolTipContent} placement={tooltipPosition}>
          {children}
        </Tooltip>
      )}
    >
      <MUIAvatar alt={name} src={src} />
    </ConditionalWrapper>
  </ConditionalWrapper>
);
