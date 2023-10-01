import {Backdrop, CircularProgress, circularProgressClasses} from "@mui/material";

interface LoadingProps {
  isLoading: boolean
}

export default function Loading({isLoading}: LoadingProps) {

  return (
    <Backdrop
      sx={{
        position: 'absolute',
        background: 'rgba(0, 0, 0, .1)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open={isLoading}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
      />
    </Backdrop>
  );
}
