const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware to parse incoming request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint to handle form submissions
app.post('/submit_form', (req, res) => {
    // Destructure form data from request body
    const firstName = req.body['first-name'];
    const lastName = req.body['last-name'];
    const email = req.body.email;
    const message = req.body.message;

    // Log to check if data is correctly parsed
    console.log('Request Body:', req.body);

    // Create a Nodemailer transporter using Gmail's SMTP server and OAuth2
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_USER, // Your Gmail address
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: process.env.GMAIL_ACCESS_TOKEN, // Optional, if you have it already
        }
    });

    // Email message configuration
    let mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'Portfolio Contact',
        // HTML formatted body
        html: `
            <p>You have a new message from ${firstName} ${lastName} (${email}):</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending message');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Message sent successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
