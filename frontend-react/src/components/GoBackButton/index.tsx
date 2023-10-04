import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import {ReactNode} from "react";

interface GoBackButtonProps {
  children: ReactNode
}

export default function GoBackButton({children}: GoBackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} variant="contained" size="large"
            startIcon={<ReplyIcon/>} sx={{mb: {xs: 3, sm: 0}, mt: {xs: 2, sm: 0}}}>
      {children}
    </Button>
  );
}
