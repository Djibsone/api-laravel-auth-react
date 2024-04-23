import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState("");
    const { user, logout } = useAuth();
    // useEffect(()=>{
    //     const fetchUserDetails = async () => {
    //         try{
    //             const token = localStorage.getItem("token");

    //             if(!token){
    //                 navigate('/login');
    //                 return ;
    //             }
    
    //             const response = await axios.get("http://127.0.0.1:8000/api/usetdetail",{
    //                 headers:{
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
                
    //             setUserDetails(response.data);
    //         }catch(error){
    //             if (error.response && error.response.status === 401) {
    //                 Swal.fire({
    //                   icon: "error",
    //                   title: "Authentication Failed",
    //                   text: "Please log in again.",
    //                 }).then(() => {
    //                   navigate("/");
    //                 });
    //               } else {
    //                 console.error("Error fetching user details:", error);
    //               }
    //         }
    //     };
    //     fetchUserDetails();
    // },[])
    console.log(user);

    return(
        <>
            <Navbar/>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h3>Welcome To Dashboard</h3>
                        {user && (
                            <div>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>   
    )
}

export default Dashboard;