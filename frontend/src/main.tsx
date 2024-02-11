import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from "axios"
import {Toaster} from 'react-hot-toast'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
axios.defaults.baseURL = "http://localhost:5000/api/v1";
// helps exchange cookies with backend
axios.defaults.withCredentials = true;

const theme = createTheme({typography: {fontFamily: "Nunito,serif", allVariants:{color:"white"} }} )
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-center'/>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
