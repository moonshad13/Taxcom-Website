require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// SMTP Transport Setup
const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: 'taxcomp@outlook.com', // Replace with your email
    pass: 'qhxevwjwptmmarwl'          // Replace with your email password or app-specific password
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'taxcomp@outlook.com', // Replace with your email
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const cors = require('cors');
app.use(cors({
  origin: '*', // Replace '*' with your frontend's domain for better security
}));

