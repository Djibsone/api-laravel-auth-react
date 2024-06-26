// LoginForm.jsx
import React from 'react';
import { Link } from "react-router-dom";

const LoginForm = ({ handleChange, validationErrors, handleLogin }) => {
  return (
    <div className="login">
      <h2>LOG IN</h2>
      <div className="form-outline mb-4">
        <input type="text" name="email" placeholder="Enter Email" className="form-control" onChange={handleChange} />
        {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
      </div>
      <div className="form-outline mb-4">
        <input type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} />
        {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
      </div>
      <div className="d-flex justify-content-end">
          <Link to="/forgot-password">FORGET PASSWORD?</Link>
      </div>
      <button onClick={handleLogin}>LOG IN</button>
    </div>
  );
};

export default LoginForm;
