import {Alert, Button, Grid} from "@mui/material";
import {ReactDOM} from "react";

interface FetchErrorProps {
  onFetch: () => void,
  buttonLabel?: string,
  children?: ReactDOM
}

export default function FetchError({onFetch, buttonLabel, children}: FetchErrorProps) {

  return (
    <Grid container display="flex" direction="column" justifyContent="center" alignItems="center"
          sx={{p: {xs: 2, sm: 3, md: 4}}}>
      <Alert variant="filled" severity="error" sx={{width: '100%', mb: 3}}>
        {children ? children : "An unexpected error occurred..."}
      </Alert>
      <Button onClick={onFetch} variant="contained">{buttonLabel ? buttonLabel : "Click to Load again"}</Button>
    </Grid>
  );
}
