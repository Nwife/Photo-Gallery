import { HourglassDisabledRounded } from "@mui/icons-material";
import {
  CircularProgress,
  Container,
  ContainerProps,
  Typography,
} from "@mui/joy";
import { useAtom, useAtomValue } from "jotai";
import { loadingPicturesAtom, sortedPicturesAtom } from "../store";
import { Picture } from "./picture";
import { Upload } from "./upload";

export function Gallery(props: GalleryProps): JSX.Element {
  const { sx, ...other } = props;

  const [loadingPictures] = useAtom(loadingPicturesAtom);

  const pictures = useAtomValue(sortedPicturesAtom);

  return (
    <>
      {loadingPictures ? (
        <Container
          sx={{
            display: "grid",
            placeItems: "center",
            gap: 2,
            paddingY: "250px",
          }}
          {...other}
        >
          <CircularProgress size="lg" />
        </Container>
      ) : pictures?.length < 1 ? (
        <Container
          sx={{
            display: "grid",
            placeItems: "center",
            gap: 2,
            paddingY: "250px",
          }}
          {...other}
        >
          <HourglassDisabledRounded size="lg" />
          <Typography
            sx={{
              width: "100%",
              maxWidth: "400px",
              marginX: "auto",
              textAlign: "center",
            }}
            marginBottom="20px"
          >
            There no pictures uploaded yet
          </Typography>
          <Upload />
        </Container>
      ) : (
        <Container
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            },
            gap: 2,
          }}
          {...other}
        >
          {pictures.map((x) => (
            <Picture
              key={x?.id}
              src={x?.src}
              srcSet={x.srcSet}
              name={x.name}
              location={x.location}
              id={x?.id}
              tags={x?.tags}
            />
          ))}
        </Container>
      )}
    </>
  );
}

export type GalleryProps = Omit<ContainerProps, "children">;
