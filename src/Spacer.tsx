import { styled } from "@mui/material";

export const Spacer = styled("div")<{ spacing?: number }>`
  height: ${({ theme, spacing }) => theme.spacing(spacing ?? 1)};
`;
