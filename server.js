const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/routes');

// Connect to MongoDB
mongoose.connect(process.env.mongoURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const app = express();

// Serve static files from public directory
app.use(express.static('public'));

app.use(cors());
app.use(express.json());
app.use('/api', routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
