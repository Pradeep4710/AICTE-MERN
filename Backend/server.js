// importing packages
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
// importing db config
const connectDB = require('./config/db');
// importing routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Update CORS configuration to allow requests from both 3000 and 5173 ports
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware and routes
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});