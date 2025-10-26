import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import React from 'react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>


)
