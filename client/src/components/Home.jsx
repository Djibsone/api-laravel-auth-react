import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";

const Home = () => {
    const { user } = useAuth();
    return(
        <>
            <Navbar />
            <h1>Welcome, {user.name } </h1>
        </>
    );
}

export default Home;