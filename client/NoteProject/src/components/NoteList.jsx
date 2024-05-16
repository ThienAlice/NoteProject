import { NoteAddOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
export const NoteList = () => {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { folder } = useLoaderData();
  const submit = useSubmit();
  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "POST", action: `/folders/${folderId}` }
    );
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
    if (folder?.notes?.[0]) {
      navigate(`notes/${folder.notes[0].id}`);
    }
  }, [noteId, folder?.notes?.[0]]);
  return (
    <>
      <Grid container height="100%">
        <Grid
          item
          xs={4}
          sx={{
            width: "100%",
            maxWidth: 360,
            backgroundColor: "#F0EBE3",
            height: "100%",
            overflowY: "auto",
            padding: "10px",
            textAlign: "left",
          }}
        >
          <List
            subheader={
              <Box
                sx={{
                  mb: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Note</Typography>
                <Tooltip title="Add note">
                  <IconButton size="small" onClick={handleAddNewNote}>
                    <NoteAddOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            {folder.notes.map(({ id, content, updatedAt }) => {
              return (
                <Link
                  key={id}
                  to={`notes/${id}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => setActiveNoteId(id)}
                >
                  <Card
                    sx={{
                      mb: "5px",
                      backgroundColor:
                        id === activeNoteId ? `rgb(255 211 140)` : null,
                    }}
                  >
                    <CardContent
                      sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                    >
                      <div
                        style={{ fontSize: 14, fontWeight: "bold" }}
                        dangerouslySetInnerHTML={{
                          __html: `${content.substring(0, 30) || "Empty"}`,
                        }}
                      ></div>
                      <Typography sx={{ fontSize: "10px" }}>
                        {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};
