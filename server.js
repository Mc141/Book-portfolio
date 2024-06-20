const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const { check, validationResult } = require('express-validator');
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});
app.use('/submit_form', limiter);

// Validation middleware using express-validator
const validateForm = [
    check('first-name').notEmpty().trim().escape(),
    check('last-name').notEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('message').notEmpty().trim().escape()
];

// POST endpoint to handle form submissions
app.post('/submit_form', validateForm, (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure form data from request body
    const { 'first-name': firstName, 'last-name': lastName, email, message } = req.body;

    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_USER,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: process.env.GMAIL_ACCESS_TOKEN,
        }
    });

    // Email message configuration
    let mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'Portfolio Contact',
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
