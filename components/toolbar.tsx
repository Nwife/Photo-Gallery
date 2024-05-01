import { MenuRounded } from "@mui/icons-material";
import { Box, IconButton, Sheet, SheetProps, Typography } from "@mui/joy";
import { useAtomValue } from "jotai";
import { picturesCountAtom } from "../store";
import { Upload } from "./upload";

export function Toolbar(props: ToolbarProps): JSX.Element {
  const { sx, ...other } = props;
  const picturesCount = useAtomValue(picturesCountAtom);

  return (
    <Sheet
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 1fr minmax(0, 1fr)",
        borderBottom: "1px solid",
        borderBottomColor: "divider",
        alignItems: "center",
        py: 1,
        px: 2,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton>
          <MenuRounded />
        </IconButton>
        <Typography sx={{ fontSize: "1.25rem" }} level="h1">
          Photo Gallery
        </Typography>
      </Box>

      <Box
        sx={{
          justifySelf: "center",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }} level="h3">
          London
        </Typography>
        <Typography level="body-xs">
          {picturesCount} photos, 0 videos
        </Typography>
      </Box>

      <Box sx={{ justifySelf: "flex-end" }}>
        <Upload />
      </Box>
    </Sheet>
  );
}

export type ToolbarProps = Omit<SheetProps, "children">;
