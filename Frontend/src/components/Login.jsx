import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                // Store user info in localStorage (adjust based on response)
                localStorage.setItem('user', JSON.stringify({ username: data.username, token: data.token }));
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Server error, please try again.');
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Login to Your Account</h2>
            <form onSubmit={handleLogin} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
            <p className="text-center mt-3">Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
};

export default Login;