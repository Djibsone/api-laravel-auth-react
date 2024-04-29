import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const errors = validateForm({ email });
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const response = await axios.post(API_BASE_URL + '/forgot-password', { email });
            setEmail("");
            
            if (response.data.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Reset Password",
                    text: response.data.message,
                }).then(()=>{
                    setEmail("");
                    setValidationErrors({});
                    navigate('/login');
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Password Reset Failed",
                    text: response.data.message || "An error occurred while processing your request. Please try again later.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Password Reset Failed",
                text: "An error occurred while processing your request. Please try again later.",
            });
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid";
        }
        return errors;
    };

    return (
        <body className="body">
            <div className="center">
                <h1>RESET PASSWORD</h1>
                <form>
                <div className="txt_field">
                    <input type="email" name="email" onChange={handleChange} />
                    {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
                    <label>Email</label>
                </div>
                <input type="button" value="Send Email" onClick={handleForgotPassword} />
                <div className="signup_link">Go to Login? <Link to="/login">Login</Link></div>
                </form>
            </div>
        </body>
    );
};

export default ForgotPassword;