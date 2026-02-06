// utils/sms.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE; // Your Twilio number

const client = twilio(accountSid, authToken);

async function sendAlertSMS(toNumbers, message) {
  try {
    const results = [];
    for (const number of toNumbers) {
      const result = await client.messages.create({
        body: message,
        from: twilioPhone,
        to: number,
      });
      results.push(result.sid);
    }
    return results;
  } catch (err) {
    console.error("Error sending SMS:", err);
    throw err;
  }
}

module.exports = sendAlertSMS;
