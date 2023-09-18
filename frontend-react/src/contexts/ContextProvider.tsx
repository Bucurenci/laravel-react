import {createContext, useContext, useState} from "react";

const StateContext = createContext({})

export interface AuthUserType {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  avatar: {
    full: string | null;
    medium: string | null;
    thumb: string | null;
  };
  password?: string;
  password_confirmation?: string;
  created_at?: string;
}

export const ContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState<AuthUserType>({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    avatar: {
      full: null,
      medium: null,
      thumb: null,
    }
  });
  const [notification, _setNotification] = useState('');
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('');
    }, 5000);
  }

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const providerValue = {
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
