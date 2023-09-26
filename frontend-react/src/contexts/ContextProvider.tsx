import {ReactNode, createContext, useContext, useState, Dispatch, SetStateAction} from "react";
import {AuthUser} from "../models/User";

export enum NotificationTypes {
  ERROR = "danger",
  SUCCESS = "success",
  WARNING = "warning"
}

export type Notification = {
  content: ReactNode,
  type?: NotificationTypes
}

export interface ContextProviderType {
  authUser: AuthUser | null;
  notification: Notification | null;
  token: string | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>,
  setNotification: (notification: ReactNode, type?: NotificationTypes) => void;
  setToken: (token: string | null) => void,
}

interface ContextProviderProps {
  children: ReactNode;
}

const StateContext = createContext<ContextProviderType>({
  authUser: null,
  notification: null,
  token: localStorage.getItem('ACCESS_TOKEN'),
  setAuthUser: () => {
  },
  setNotification: () => {
  },
  setToken: () => {
  },
});

export const ContextProvider = ({children}: ContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [notification, _setNotification] = useState<Notification | null>(null);
  const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

  const setNotification = (notification: ReactNode, type: NotificationTypes = NotificationTypes.SUCCESS) => {
    _setNotification({content: notification, type: type});

    setTimeout(() => {
      _setNotification(null);
    }, 4000);
  }

  const setToken = (token: string | null) => {
    _setToken(token);

    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const providerValue: ContextProviderType = {
    authUser,
    token,
    notification,
    setAuthUser,
    setToken,
    setNotification
  }

  return (
    <StateContext.Provider value={providerValue}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
