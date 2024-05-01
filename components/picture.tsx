import { LocationOnRounded, MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardCover,
  CardProps,
  Chip,
  CircularProgress,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import {
  removeTagAttom,
  updatePictureAttom,
  updatingPictureAttom,
} from "../store";
import { PictureMenu } from "./picture-menu";

export function Picture(props: PictureProps): JSX.Element {
  const { sx, src, srcSet, name, location, id, tags = [], ...other } = props;

  const [, updatePicture] = useAtom(updatePictureAttom);

  const [, removeTag] = useAtom(removeTagAttom);

  const [nameEditable, setNameEditable] = useState(false);
  const [locationEditable, setLocationEditable] = useState(false);

  const [editedName, setEditedName] = useState(name);

  const [editedLocation, setEditedLocation] = useState(location);

  const lastTapTime = useRef(0);
  const lastTarget = useRef<any>(null);

  function handleDoubleTap(e: any, target: "name" | "location") {
    e?.stopPropagation();
    var currentTime = new Date().getTime();
    var tapLength = currentTime - lastTapTime?.current;

    if (
      tapLength < 600 &&
      tapLength > 0 &&
      lastTarget?.current?.id == e?.target?.id
    ) {
      // Double tap detected

      if (target == "name") {
        setNameEditable(true);
        setEditedName(name);
        console.log("Double tap!", target);
      } else if (target == "location") {
        setLocationEditable(true);
        setEditedLocation(location);
        console.log("Double tap!", target);
      }

      // Reset lastTapTime
      lastTapTime.current = 0;
      lastTarget.current = null;
    } else {
      // Not a double tap
      lastTapTime.current = currentTime;
      lastTarget.current = e?.target;
      setNameEditable(false);
      setLocationEditable(false);
    }
  }

  const [updating, setUpdating] = useAtom(updatingPictureAttom);

  const [saving, setSaving] = useState(false);

  async function saveEdits() {
    setSaving(true);
    try {
      let update: any = {};

      if (name !== editedName) {
        update.name = editedName;
      }

      if (location !== editedLocation) {
        update.location = editedLocation;
      }

      if (Object.keys(update)?.length > 0) {
        await updatePicture({ id: id as any, value: update });
        setEditedName(name);
        setEditedLocation(location);
      }
    } catch (err: any) {
      console.log(err);
    }
    setSaving(false);
  }

  const [preview, setPreview] = useState(false);

  return (
    <>
      <Modal open={preview} onClose={() => setPreview(false)}>
        <ModalDialog
          sx={{
            width: "680px",
            padding: 0,
            overflow: "hidden",
            position: "relative",
          }}
          onClick={(e: any) => e?.stopPropagation()}
        >
          <ModalClose />
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: { xs: "wrap", md: "nowrap" },
              width: "100%",
            }}
          >
            <Card
              sx={{
                minHeight: 280,
                minWidth: { xs: "100%", md: "50%" },
                position: "relative",
                cursor: "pointer",
                aspectRatio: "1/1",
                border: 0,
                borderRadius: 0,
                ...sx,
              }}
              {...other}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: 0,
                  height: "fit-content",
                  width: "100%",
                  maxWidth: "100%",
                  overflowX: "auto",
                  zIndex: 5,
                  paddingX: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "4px",
                    width: "fit-content",
                    marginLeft: { md: "auto" },
                  }}
                >
                  {tags?.map((tag, idx) => (
                    <Tooltip title="Remove tag" size="sm" arrow>
                      <Chip
                        variant="soft"
                        size="sm"
                        color="danger"
                        onClick={(e) => {
                          e?.stopPropagation();
                          const confirmed = confirm("Remove tag?");
                          if (confirmed) {
                            removeTag({ id: id as string, tagIndex: idx });
                          }
                        }}
                        sx={{
                          backgroundColor: "white",
                        }}
                        slotProps={{
                          root: {
                            sx: {
                              display: "flex",
                              alignItems: "center",
                            },
                          },
                          label: {
                            sx: {
                              height: "fit-content",
                              lineHeight: "100%",
                              fontSize: "12px",
                            },
                          },
                        }}
                      >
                        {tag}
                      </Chip>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              <CardCover>
                <img
                  src={src}
                  alt={name}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    width: "100%",
                    minHeight: "100%",
                  }}
                />
              </CardCover>
            </Card>
            <Box
              sx={{
                position: "relative",
                paddingRight: "20px",
                paddingLeft: "10px",
                paddingY: "40px",
                width: "100%",
              }}
            >
              {saving ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <CircularProgress
                    color="neutral"
                    sx={{ fontSize: "16px", color: "inherit", zIndex: 10 }}
                  />
                </Box>
              ) : (
                <></>
              )}
              <Box sx={{ display: "grid", gap: "20px" }}>
                <Box>
                  <Typography fontSize={"14px"} fontWeight={300}>
                    Name
                  </Typography>
                  <Input
                    id={`name:${id}`}
                    name="name"
                    value={editedName}
                    onInput={(e: any) => {
                      if (!e?.target?.value) return;
                      setEditedName(e?.target?.value || "");
                    }}
                    onKeyUp={(e) => {
                      if (e?.key == "Enter") {
                        saveEdits();
                      }
                    }}
                    slotProps={{
                      input: {
                        width: "100%",
                        outlineColor: "#fff",
                        padding: "2px",
                        border: "none",
                        fontSize: "16px",
                        backgroundColor: "transparent",
                        fontFamily: `var(--joy-fontFamily-body, "Inter", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))`,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography fontSize={"14px"} fontWeight={300}>
                    Location
                  </Typography>
                  <Input
                    id={`name:${id}`}
                    name="location"
                    value={editedLocation}
                    onInput={(e: any) => {
                      if (!e?.target?.value) return;
                      setEditedLocation(e?.target?.value || "");
                    }}
                    onKeyUp={(e) => {
                      if (e?.key == "Enter") {
                        saveEdits();
                      }
                    }}
                    slotProps={{
                      input: {
                        width: "100%",
                        outlineColor: "#fff",
                        padding: "2px",
                        border: "none",
                        fontSize: "16px",
                        backgroundColor: "transparent",
                        fontFamily: `var(--joy-fontFamily-body, "Inter", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))`,
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
      <Card
        sx={{ minHeight: 280, position: "relative", cursor: "pointer", ...sx }}
        {...other}
        onClick={() => {
          if (nameEditable || locationEditable) return;
          setPreview(true);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "8px",
            right: 0,
            height: "fit-content",
            width: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            zIndex: 5,
            paddingX: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "4px",
              width: "fit-content",
              marginLeft: "auto",
            }}
          >
            {tags?.map((tag, idx) => (
              <Tooltip title="Remove tag" size="sm" arrow>
                <Chip
                  variant="soft"
                  size="sm"
                  color="danger"
                  onClick={(e) => {
                    e?.stopPropagation();
                    const confirmed = confirm("Remove tag?");
                    if (confirmed) {
                      removeTag({ id: id as string, tagIndex: idx });
                    }
                  }}
                  sx={{
                    backgroundColor: "white",
                  }}
                  slotProps={{
                    root: {
                      sx: {
                        display: "flex",
                        alignItems: "center",
                      },
                    },
                    label: {
                      sx: {
                        height: "fit-content",
                        lineHeight: "100%",
                        fontSize: "12px",
                      },
                    },
                  }}
                >
                  {tag}
                </Chip>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <CardCover>
          <img src={src} srcSet={srcSet} alt={name} loading="lazy" />
        </CardCover>

        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />

        {saving ? (
          <CardCover sx={{ display: "grid", placeItems: "center" }}>
            <div>
              <CircularProgress
                color="neutral"
                sx={{ fontSize: "16px", color: "inherit", zIndex: 10 }}
              />
            </div>
          </CardCover>
        ) : (
          <></>
        )}

        <CardContent sx={{ justifyContent: "flex-end" }}>
          {nameEditable ? (
            <>
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "transparent",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></Box>
              <input
                name="name"
                value={editedName}
                onInput={(e: any) => {
                  if (!e?.target?.value) return;
                  setEditedName(e?.target?.value || "");
                }}
                onKeyUp={(e) => {
                  if (e?.key == "Enter") {
                    setNameEditable(false);
                    saveEdits();
                  }
                }}
                onBlur={() => {
                  setNameEditable(false);
                  saveEdits();
                }}
                style={{
                  width: "fit-content",
                  outlineColor: "#fff",
                  padding: "2px",
                  border: "none",
                  fontSize: "16px",
                  backgroundColor: "transparent",
                  fontFamily: `var(--joy-fontFamily-body, "Inter", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))`,
                }}
                autoFocus
              />
            </>
          ) : (
            <Typography
              level="title-md"
              textColor="#fff"
              onTouchEnd={(e: any) => (
                e?.preventDefault(),
                e?.stopPropagation(),
                handleDoubleTap(e, "name")
              )}
              onMouseUp={(e: any) => (
                e?.preventDefault(),
                e?.stopPropagation(),
                handleDoubleTap(e, "name")
              )}
              onClick={(e) => e?.stopPropagation()}
            >
              {name}
            </Typography>
          )}

          <Typography
            level="body-xs"
            startDecorator={<LocationOnRounded />}
            textColor="neutral.300"
          >
            {locationEditable ? (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: "transparent",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></Box>
                <input
                  name="location"
                  value={editedLocation}
                  onInput={(e: any) => {
                    if (!e?.target?.value) return;
                    setEditedLocation(e?.target?.value || "");
                  }}
                  onKeyUp={(e) => {
                    if (e?.key == "Enter") {
                      setLocationEditable(false);
                      saveEdits();
                    }
                  }}
                  onBlur={() => {
                    setLocationEditable(false);
                    saveEdits();
                  }}
                  style={{
                    width: "fit-content",
                    outlineColor: "#fff",
                    padding: "2px",
                    border: "none",
                    fontSize: "12px",
                    backgroundColor: "transparent",
                    fontFamily: `var(--joy-fontFamily-body, "Inter", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))`,
                  }}
                  autoFocus
                />
              </>
            ) : (
              <span
                onTouchEnd={(e: any) => (
                  e?.preventDefault(),
                  e?.stopPropagation(),
                  handleDoubleTap(e, "location")
                )}
                onMouseUp={(e: any) => (
                  e?.preventDefault(),
                  e?.stopPropagation(),
                  handleDoubleTap(e, "location")
                )}
                onClick={(e) => e?.stopPropagation()}
              >
                {location || "Undefined"}
              </span>
            )}
          </Typography>
        </CardContent>
        <PictureMenu
          picture={{ src, srcSet, name, location, id: id as any, tags }}
          buttonProps={{
            sx: {
              position: "absolute",
              bottom: "12px",
              right: "12px",
              zIndex: 5,
              padding: "0",
              border: "none",
            },
          }}
        >
          <MoreVert size="sm" />
        </PictureMenu>
      </Card>
    </>
  );
}

export type PictureProps = Omit<
  CardProps<
    "div",
    {
      src: string;
      srcSet: string;
      name: string;
      location: string;
      tags?: string[];
    }
  >,
  "children"
>;
