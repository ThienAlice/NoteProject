import { Box, Card, CardContent, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NewFolder } from "./NewFolder";

export const FolderList = ({ folders }) => {
  const { folderId, noteId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);

  return (
    <>
      <List
        sx={{
          width: "100%",
          backgroundColor: "#7D9D9C",
          height: "100%",
          padding: "10px",
          textAlign: "left",
          overflowY: "auto",
        }}
        subheader={
          <Box
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "white" }}>
              Folders
            </Typography>
            <NewFolder />
          </Box>
        }
      >
        {folders.map(({ id, name }) => {
          return (
            <Link
              key={id}
              to={`folders/${id}`}
              style={{
                textDecoration: "none",
              }}
              onClick={() => {
                setActiveFolderId(id);
              }}
            >
              <Card
                sx={{
                  mb: "5px",
                  backgroundColor:
                    id === activeFolderId ? `rgb(255 211 140)` : null,
                }}
              >
                <CardContent
                  sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                >
                  <Typography>{name}</Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </List>
    </>
  );
};
