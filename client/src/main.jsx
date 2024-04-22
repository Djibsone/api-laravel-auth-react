// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// // import reportWebVitals from './reportWebVitals'
// import {BrowserRouter} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
// <BrowserRouter>
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// </BrowserRouter>
// );

// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

