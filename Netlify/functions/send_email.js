// netlify/functions/send_email.js
const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    const msg = {
      to: 'taxcomp@outlook.com',      // Your Outlook email
      from: 'noreply@yourdomain.com', // A verified sender email on SendGrid
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: 'Your message has been sent successfully. Thank you!',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
