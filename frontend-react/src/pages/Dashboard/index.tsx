import {Box, Grid, Typography} from "@mui/material";
import LastUsersAdded from "../../features/Users/LastUsersAdded";
import ProjectDescription from "../../features/ProjectDescription";

export default function Dashboard() {

  return (
    <>
      <Box component="div" sx={{mb: 3}}>
        <Typography variant="h4" mb={0} gutterBottom>Dashboard</Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProjectDescription/>
        </Grid>
        <Grid item xs={12} md={6}>
          <LastUsersAdded/>
        </Grid>
      </Grid>
    </>
  );
}
