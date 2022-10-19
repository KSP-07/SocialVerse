import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*  wrapping this app in authcontext provider */}
    <AuthContextProvider>
      {/* this app in now our children (see in authcontext.js)   .. so we are sharing all these values like user, isFetching, error of authcontext in <APP> here */}
      <App />
    </AuthContextProvider>      
  </React.StrictMode>
);
  