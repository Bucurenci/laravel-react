import {ReactNode} from "react";
import {AlertColor} from "@mui/material";

export type Notification = {
    content: ReactNode,
    type?: AlertColor | undefined
}
