// SignupForm.jsx
import React from 'react';

const SignupForm = ({ handleChange, validationErrors, handleSignup }) => {
  return (
    <div className="signup">
      <h2>SIGN UP</h2>
      <div className="form-outline mb-4">
        <input type="text" name="fullname" placeholder="Enter Name" className="form-control" onChange={handleChange} />
        {validationErrors.name && <span className="text-danger">{validationErrors.name[0]}</span>}
      </div>
      <div className="form-outline mb-4">
        <input type="email" name="email" placeholder="Enter Email" className="form-control" onChange={handleChange} />
        {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
      </div>
      <div className="form-outline mb-4">
        <input type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} />
        {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
      </div>
      <button onClick={handleSignup}>SIGN UP</button>
    </div>
  );
};

export default SignupForm;
