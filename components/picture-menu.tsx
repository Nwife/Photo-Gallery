import { Delete, Tag, WarningRounded } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Dropdown,
  Input,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuProps,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  Picture,
  addTagAttom,
  addingTagAtom,
  deletePictureAtom,
  deletingPictureAtom,
} from "../store";

export function PictureMenu(props: PictureMenuProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [, deletePicture] = useAtom(deletePictureAtom);
  const [deletingPicture] = useAtom(deletingPictureAtom);
  async function deleteFn() {
    try {
      await deletePicture(props?.picture?.id);
      setConfirmDeleteOpen(false);
    } catch (err: any) {
      console.log(err);
    }
  }
  const [, addTag] = useAtom(addTagAttom);
  const [addingTag] = useAtom(addingTagAtom);
  const [tag, setTag] = useState("");
  const [tagErr, setTagErr] = useState("");

  const [addTagOpen, setAddTagOpen] = useState(false);

  async function addTagFn() {
    if (!tag) return alert("Tag is required");
    try {
      await addTag({ id: props?.picture?.id, tag });
      setAddTagOpen(false);
      setTag("");
      setTagErr("");
    } catch (err: any) {
      console.log(err);
    }
  }
  return (
    <>
      <Modal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          onClick={(e: any) => e?.stopPropagation()}
        >
          <DialogTitle>
            <WarningRounded />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this picture?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={deleteFn}>
              {deletingPicture ? (
                <CircularProgress sx={{ fontSize: "16px", color: "inherit" }} />
              ) : (
                "Delete"
              )}
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setConfirmDeleteOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
      <Modal open={addTagOpen} onClose={() => setAddTagOpen(false)}>
        <ModalDialog
          sx={{ padding: "20px" }}
          onClick={(e: any) => e?.stopPropagation()}
          size="lg"
        >
          <ModalClose />
          <Typography
            sx={{
              marginTop: "10px",
              fontSize: "18px",
            }}
          >
            Add Tag
          </Typography>
          <Typography color="neutral">Enter tag name</Typography>
          <Input
            value={tag}
            onInput={(e: any) => setTag(e?.target?.value)}
            error={tagErr ? true : false}
            startDecorator={
              <>
                <Tag size="sm" />
              </>
            }
            placeholder="Throwback"
          />
          <Button onClick={addTagFn} color="primary">
            {addingTag ? (
              <CircularProgress sx={{ fontSize: "16px", color: "inherit" }} />
            ) : (
              "Add"
            )}
          </Button>
        </ModalDialog>
      </Modal>
      <Dropdown onClick={(e: any) => e?.stopPropagation()}>
        <MenuButton
          component={"div"}
          {...(props?.buttonProps || {})}
          onClick={(e: any) => e?.stopPropagation()}
        >
          {props?.children}
        </MenuButton>
        <Menu
          {...(props?.menuProps || {})}
          sx={{ fontSize: "14px", ...(props?.menuProps?.sx || {}) }}
          onClick={(e: any) => e?.stopPropagation()}
        >
          {(props?.picture?.tags || [])?.length < 3 ? (
            <MenuItem
              onClick={(e) => (e?.stopPropagation(), setAddTagOpen(true))}
            >
              <Tag sx={{ fontSize: "16px" }} />
              Add Tag
            </MenuItem>
          ) : (
            <></>
          )}

          <MenuItem
            sx={{ color: "red !important" }}
            onClick={(e) => (
              e?.stopPropagation(), setConfirmDeleteOpen(!confirmDeleteOpen)
            )}
          >
            <Delete sx={{ fontSize: "16px", color: "inherit" }} />
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}

export interface PictureMenuProps {
  picture: Picture;
  children: JSX.Element;
  buttonProps?: MenuButtonProps;
  menuProps?: MenuProps;
}
