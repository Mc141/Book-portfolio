var express = require('express');
var router = express.Router();
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const path = require('path');
const nodemailer = require('nodemailer');




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
router.post('/contact', validateForm, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { 'first-name': firstName, 'last-name': lastName, email, message } = req.body;

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

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('SendMail Error:', error);
        res.status(500).send('Failed to send message. Please try again later.');
    }
});






module.exports = router;




