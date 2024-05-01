import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Snackbar,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  updloadPicturesAtom,
  uploadPictureErrorAtom,
  uploadingPictureAtom,
} from "../store";

export const allowedFormats =
  "image/png,image/jpeg,image/webp,image/svg,image/jpg";

function bytesToSize(bytes: number) {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return kb.toFixed(2) + " KB";
  } else {
    const mb = kb / 1024;
    return mb.toFixed(2) + " MB";
  }
}

export function Upload() {
  const [show, setShow] = useState(false);
  const input = useRef<any>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [uploadingPicture, setUploadingPicture] = useAtom(uploadingPictureAtom);

  const [uploadPictureErrors, setUploadPictureErrors] = useAtom(
    uploadPictureErrorAtom
  );

  const [, uploadPictures] = useAtom(updloadPicturesAtom);

  function handleInputChange(e: any) {
    setFiles([...e?.target?.files]);
    setShow(true);
    e.target.files = undefined;
    input.current.files = null;
  }

  async function uploadFn() {
    try {
      await uploadPictures({ files: [...files], setFiles });
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (files?.length > 0) {
      uploadFn();
    }
  }, [files]);

  return (
    <>
      <Snackbar
        open={show}
        variant="outlined"
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setShow(false);
        }}
        sx={{ width: "100%", maxWidth: "385px" }}
      >
        <Box sx={{ width: "100%", position: "relative" }}>
          <IconButton
            sx={{ position: "absolute", top: "-10px", right: "-10px" }}
            onClick={() => {
              setShow(false);
              setUploadPictureErrors({});
              setUploadingPicture({});
              setFiles([]);
            }}
          >
            <Close />
          </IconButton>
          <Typography color="primary" fontSize="14px">
            Uploading {files?.length} Files
          </Typography>
          <Typography fontSize={"12px"} color="neutral">
            Please wait
          </Typography>
          <Divider sx={{ marginY: "10px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {files?.map((file, idx) => (
              <Box
                sx={{ display: "flex", gap: "20px", alignItems: "center" }}
                key={idx}
              >
                <CircularProgress
                  determinate={true}
                  value={uploadingPicture[file?.name] || 0}
                  size="md"
                  color={uploadPictureErrors[file?.name] ? "danger" : "primary"}
                />
                <Box>
                  <Typography
                    fontSize={"12px"}
                    sx={{ textOverflow: "ellipsis" }}
                  >
                    {file?.name}
                  </Typography>
                  <Typography fontSize={"10px"}>
                    {bytesToSize(file?.size)}
                  </Typography>
                  {uploadPictureErrors[file?.name] ? (
                    <Typography fontSize={"10px"} color="danger">
                      {uploadPictureErrors[file?.name]}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Snackbar>
      <input
        type="file"
        accept={allowedFormats}
        hidden
        ref={input}
        multiple
        onChange={handleInputChange}
        onInput={handleInputChange}
      />
      <Tooltip title="Upload photos" size="sm" arrow>
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          }
          onClick={() => {
            if (files?.length > 0) return;
            if (input?.current) {
              input?.current?.click();
            }
          }}
        >
          Upload a file
        </Button>
      </Tooltip>
    </>
  );
}
