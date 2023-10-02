import React from 'react'
import ReactDOM from 'react-dom/client'
import router from "./router";
import {RouterProvider} from "react-router-dom";
import {ContextProvider} from "./contexts/ContextProvider";
import './main.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>
)
