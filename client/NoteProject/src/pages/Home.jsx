import { AuthContext } from "../Context/AuthProvider";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { UserMenu } from "../components/UserMenu";
import { FolderList } from "../components/FolderList";
import Notification from "../components/Notification";

export const Home = () => {
  const { folders } = useLoaderData();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "10px",
        }}
      >
        <Notification />

        <UserMenu />
      </Box>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>

      <Grid
        container
        sx={{
          height: "50vh",
          marginTop: "50px",
          boxShadow: "0 0 15px 0 rgba(193 193 193 / 60%)",
        }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};
