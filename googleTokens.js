const { google } = require('googleapis');
const readline = require('readline');

// OAuth2 configuration
const oauth2Client = new google.auth.OAuth2(
  'client id',
  'Client secret',
  'url http://localhost:5000/'
);

// Generate OAuth2 URL for authorization
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://mail.google.com/'
});

console.log('Authorize this app by visiting this url:', authUrl);

// Capture authorization code
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log('Access token:', token);
  });
});
