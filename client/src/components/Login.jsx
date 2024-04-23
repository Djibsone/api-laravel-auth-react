import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    
    const [validationErrors, setValidationErrors] = useState({});

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/login', formData /*{ email: formData.email, password: formData.password, }*/);
    
            login(response.data.user);
    
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
            }).then(() => {
                navigate("/home");
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password. Please try again.",
                });
            } else {
                const responseData = error.response.data;
                setValidationErrors(responseData);
                if (responseData) {
                    setValidationErrors(responseData);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData || "Registration failed.",
                    });
                }
            }
        }
    };

    return (
        <body className="body">
            <div className="center">
                <h1>LOG IN</h1>
                <form>
                <div className="txt_field">
                    <input type="email" name="email" onChange={handleChange} />
                    {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
                    <label>Email</label>
                </div>
                <div className="txt_field">
                    <input type="password" name="password" onChange={handleChange} />
                    {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
                    <label>Password</label>
                </div>
                <div className="pass"><Link to="/forgot-password">Forgot password?</Link></div>
                <input type="button" value="LOG IN" onClick={handleLogin} />
                <div className="signup_link">Not a member? <Link to="/register">Register</Link></div>
                </form>
            </div>
        </body>
    );
};

export default Login;

