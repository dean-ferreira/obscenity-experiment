// Import required modules for server
const express = require('express');
const cors = require('cors');

// Import BLACKLIST
let BLACKLIST = require('./data/blacklist');

// Create express app
const app = express();
const PORT = process.env.PORT || 3000; // Set port

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json());

// Routes
app.get('/blacklist', async (req, res) => {
    res.status(200).json(BLACKLIST);
})

app.post('/blacklist/:phrase', async (req, res) => {
    const phrase = req.params.phrase;
    if (BLACKLIST.includes(phrase)) {
        res.status(400).json({ message: 'Phrase already exists in blacklist.', blacklist: BLACKLIST });
    } else {
        BLACKLIST.push(phrase);
        res.status(201).json({ message: 'Phrase added to blacklist.', blacklist: BLACKLIST});
    }
});

app.delete('/blacklist/:phrase', async (req, res) => {
    const phrase = req.params.phrase;
    if (BLACKLIST.includes(phrase)) {
        BLACKLIST = BLACKLIST.filter((term) => term !== phrase);
        res.status(200).json({ message: 'Phrase removed from blacklist.', blacklist: BLACKLIST });
    } else {
        res.status(404).json({ message: 'Phrase not found in blacklist.', blacklist: BLACKLIST });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});