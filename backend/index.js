//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req,res) => {
    res.send('QuickNotes backend is running!');
});

app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});