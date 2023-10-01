import React from "react";
import {Typography} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';

export default function Logo() {

  return (
    <>
      <PetsIcon sx={{mr: 1, display: {xs: 'none', sm: 'block'}}}/>

      <Typography
        variant="h6"
        noWrap
        component="div"
        mr={3}
        sx={{display: {xs: 'none', md: 'block'}}}
      >
        Admin PawLand
      </Typography>
    </>
  );
}
