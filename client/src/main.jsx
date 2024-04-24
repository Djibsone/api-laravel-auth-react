import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { AuthProvider } from './components/AuthContext'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

