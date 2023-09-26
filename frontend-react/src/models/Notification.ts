import {ReactNode} from "react";

export enum NotificationType {
    ERROR = "danger",
    SUCCESS = "success",
    WARNING = "warning"
}

export type Notification = {
    content: ReactNode,
    type?: NotificationType
}
