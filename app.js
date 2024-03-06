// app.js
const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Database to store links (In-memory for simplicity)
const linksDB = {};

// Route for How to Use page
app.get('/how-to-use', (req, res) => {
    res.render('how-to-use');
});

// Route for Contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route for Privacy Policy page
app.get('/privacy', (req, res) => {
    res.render('privacy');
});

// Route for Terms of Service page
app.get('/terms', (req, res) => {
    res.render('terms');
});

// Route for About Us page
app.get('/about', (req, res) => {
    res.render('about');
});

// Routes for short links
app.get('/', (req, res) => {
    res.render('index', { shortUrl: null });
});

app.post('/shorten', (req, res) => {
    const originalUrl = req.body.originalUrl;
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:3000/${shortCode}`;
    linksDB[shortCode] = originalUrl;
    res.render('index', { shortUrl });
});

app.get('/:shortCode', (req, res) => {
    const shortCode = req.params.shortCode;
    const originalUrl = linksDB[shortCode];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('Link not found');
    }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
