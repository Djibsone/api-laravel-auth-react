import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    
    const [validationErrors, setValidationErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/register', formData );
    
            if (response && response.status === 200) {
                setValidationErrors({});
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Success',
                //     text: response.data.message
                // }).then(() => {
                //     navigate("/login");
                // });
                
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);                
               
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message || 'Registration failed.',
                });
            }
        } catch (error) {
            console.log(error); // Affichez l'erreur dans la console pour le débogage
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: 'An error occurred during registration.',
            // });
            toast.error(response.data.message);
        }
    };

    return (
        <body className='body'>
            <div className="center">
                <h1>REGISTER</h1>
                <form>
                    <div className="txt_field">
                        <input type="text" name="name" onChange={handleChange} />
                        {validationErrors.name && <span className="text-danger">{validationErrors.name[0]}</span>}
                        <label>Name</label>
                    </div>
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
                    <input type="button" value="REGISTER NOW" onClick={handleRegister} />
                    <div className="signup_link">You are a member? <Link to="/login">Login</Link></div>
                </form>
            </div>
        </body>
    );
};

export default Register;
