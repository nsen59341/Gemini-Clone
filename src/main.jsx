// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/context.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
<ContextProvider>
    <GoogleOAuthProvider clientId="1028718661196-bmd820m5uhb34spq1mq6btqhuodaquhj.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
</ContextProvider>
)
