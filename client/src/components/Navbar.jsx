import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return(
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark col-md-12">
            <div className="navbar-brand col-md-2">
                AuthAPP
            </div>
            
            <div className="collapse navbar-collapse col-md-8">
                <ul className="navbar navbar-nav mx-autom">
                    <li className="nav-item  nav-pills"><Link className="nav-link text-white" to="/home">Home</Link></li>
                     
                </ul>
            </div>
            <div className="dropdown col-md-2">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                        <li><Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>
        </nav>
    )
}

export default Navbar;
