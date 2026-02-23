import { StyledDrawer } from "./Sidebar.styles";

export const Sidebar = ({ open }: { open: boolean }) => (
  <StyledDrawer open={open} variant="persistent">
    SIDEBAR
  </StyledDrawer>
);
