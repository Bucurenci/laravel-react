import React from 'react'
import ReactDOM from 'react-dom/client'
import router from "./router";
import {RouterProvider} from "react-router-dom";
import {ContextProvider} from "./contexts/ContextProvider";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import './main.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router}/>
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
