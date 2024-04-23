import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const ChangePassword = () => {
    const { user, logout } = useAuth();
    const [ formData, setFormData] = useState({ cpassword: '', npassword: '', cnpassword: '' });

    const [ validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleChangePassword = async(e) => {
        e.preventDefault();
        const errors = {};

        if(!formData.cpassword.trim()){
            errors.cpassword = "Current Password is Required";
        }
        if(!formData.npassword.trim()){
            errors.npassword = "New Password is Required";
        }
        if(!formData.cnpassword.trim()){
            errors.cnpassword = "Confirm New Password is Required";
        }else if(formData.npassword != formData.cnpassword){
            errors.cnpassword = "New Password and Confirm New Password Is Not Match";
        }

        if(Object.keys(errors).length > 0 ){
            setValidationErrors(errors);
            return;
        }

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/users/change-password", {
                ...formData,
                userId: user.id
            });

            if (response.data.status == "success") {
                Swal.fire({
                    icon: "success",
                    title: "Change Password",
                    text: response.data.message
                }).then(() => {
                    logout();
                });
                
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Change Password Failed",
                    text: response.data.message || "An error occurred while processing your request. Please try again later.",
                });
            }
            
        }catch(error){
            Swal.fire({
                icon: "error",
                title: "Change Password Failed",
                text: "An error occurred while processing your request. Please try again later.",
            });
        }

    }   

    return(
        <>
            <Navbar />
            <body className='body'>
                <div className="center">
                    <h1>Change Password</h1>
                    <form>
                        <div className="txt_field">
                            <input type="password" name="cpassword" onChange={handleChange} />
                            {validationErrors.cpassword && <span className="text-danger">{validationErrors.cpassword[0]}</span>}
                            <label>Current Password</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" name="npassword" onChange={handleChange} />
                            {validationErrors.npassword && <span className="text-danger">{validationErrors.npassword[0]}</span>}
                            <label>New Password</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" name="cnpassword" onChange={handleChange} />
                            {validationErrors.cnpassword && <span className="text-danger">{validationErrors.cnpassword[0]}</span>}
                            <label>Confirm New Password</label>
                        </div>
                        <input type="button" value="Change password" onClick={handleChangePassword} />
                        <div className="signup_link">GO to Home? <Link to="/home">Home</Link></div>
                    </form>
                </div>
            </body>
        </>
    );
};

export default ChangePassword;