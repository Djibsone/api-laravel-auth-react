// import React from "react";
// import { Link } from "react-router-dom";

// const Index = () => {
//     return(
//         <div className="container">
//             <div className="header">
//                 <Link to="/login" className="link">Login</Link>
//                 <Link to="/register" className="link">Register</Link>
//                 <Link to="/form" className="link">Form</Link>
//             </div>
            
//             <h1 className="main-title">Welcome To Home Page</h1>
            
//         </div>

//     )
// }

// export default Index;

import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div className="container">
            <div className="navbar">
                <div className="navbar-items">
                    <Link to="#" className="link">Login</Link>
                    <Link to="#" className="link">Register</Link>
                    <Link to="/form" className="link">Form</Link>
                </div>
            </div>
            <div className="main-title">Welcome To Home Page</div>
            <style>
                {`
                .container {
                    text-align: center;
                }

                .navbar {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    background-color: #333;
                    color: white;
                    padding: 10px 0;
                }

                .navbar-items {
                    display: flex;
                    justify-content: space-around;
                }

                .link {
                    color: white;
                    text-decoration: none;
                    margin: 0 10px;
                }

                .main-title {
                    margin-top: 50px;
                    font-size: 24px;
                }
                `}
            </style>
        </div>
    );
};

export default Index;
