import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { addNewFolder } from "../utils/homeUtils";
import { useSearchParams, useNavigate } from "react-router-dom";

export const NewFolder = () => {
  const [newFolderName, setNewFolderName] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const popupName = searchParams.get("popup");
  const handleClosePopUp = () => {
    setNewFolderName("");
    navigate(-1);
  };
  const handleOpenPopUp = () => {
    setSearchParams({ popup: "add-folder" });
  };
  const handleFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };
  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    handleClosePopUp();
  };
  useEffect(() => {
    if (popupName === "add-folder") {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [popupName]);
  return (
    <>
      <Tooltip title="Add folder">
        <IconButton
          size="small"
          sx={{ color: "white" }}
          onClick={handleOpenPopUp}
        >
          <CreateNewFolderOutlined />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={handleClosePopUp}>
        <DialogTitle>New folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleFolderNameChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
