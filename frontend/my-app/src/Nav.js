import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
    return (
        <>
            <ol className="nav-ul" >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Products</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ol>
            <h1>Nav Bar</h1>
        </>
    );
}

export default Nav;