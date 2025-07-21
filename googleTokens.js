require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const readline = require('readline');

const oauth2Client = new OAuth2Client(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// Generate and display the URL to authorize the app
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
});

console.log('Authorize this app by visiting this URL:\n', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nEnter the code from that page here: ', async (inputCode) => {
  rl.close();

  let code = inputCode.trim();

  // If the user pasted the whole redirect URL, extract just the code
  if (code.includes('code=')) {
    const match = code.match(/code=([^&]+)/);
    if (match) code = decodeURIComponent(match[1]);
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\nTokens received:\n', tokens);
  } catch (error) {
    console.error('\nError retrieving access token:\n', error);
  }
});
