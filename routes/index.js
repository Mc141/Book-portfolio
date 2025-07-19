var express = require('express');
var router = express.Router();
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const path = require('path');




// GET home page
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});






// Validation middleware using express-validator
const validateForm = [
    check('first-name').notEmpty().trim().escape(),
    check('last-name').notEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('message').notEmpty().trim().escape()
];






// POST endpoint to handle form submissions
router.post('/submit_form', validateForm, (req, res) => {
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





module.exports = router;




