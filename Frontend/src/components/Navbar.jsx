import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        setUser(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand text-decoration-underline fs-2 fw-bold" to="/">CollabTool</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link hover-btn fw-bold" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    {user ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="fw-bold btn btn-link nav-link hover-btn" onClick={handleLogout}>
                                    {user.username} | Logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="fw-bold nav-link hover-btn" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="fw-bold nav-link hover-btn" to="/register">Register</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;