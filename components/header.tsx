import {
  DashboardRounded,
  FolderOpenRounded,
  SearchRounded,
  SortRounded,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  ContainerProps,
  IconButton,
  Input,
  Link,
  Tooltip,
} from "@mui/joy";
import { useAtom } from "jotai";
import { searchAtom, sortAtom } from "../store";

export function Header(props: HeaderProps): JSX.Element {
  const { sx, ...other } = props;

  const [searchTerm, setSearchTerm] = useAtom(searchAtom);
  const [sort, setSort] = useAtom(sortAtom);

  //sort function handler
  const sortHandler = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px",
        marginBottom: "20px",
        ...sx,
      }}
      {...other}
    >
      <Breadcrumbs sx={{ pl: 0 }}>
        <Link href="/" color="neutral">
          <DashboardRounded sx={{ mr: 0.5 }} />
          Overview
        </Link>
        <Link href="/london" color="neutral">
          <FolderOpenRounded sx={{ mr: 0.5 }} />
          London
        </Link>
      </Breadcrumbs>

      <Input
        sx={{ width: "250px" }}
        placeholder="search picture by name"
        startDecorator={<SearchRounded />}
        variant="outlined"
        color="neutral"
        size="sm"
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />

      <Box>
        <Tooltip
          title={`Sort by name:${sort === "asc" ? "des" : "asc"}`}
          size="sm"
          arrow
        >
          <IconButton onClick={() => sortHandler()}>
            <SortRounded />
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  );
}

export type HeaderProps = Omit<ContainerProps, "children">;
