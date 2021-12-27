const nodemailer = require('nodemailer');

const defaultTransporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dejah.lebsack63@ethereal.email',
        pass: 'BCqv4YnpfFvuyuPnnW'
    }
});

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

module.exports = {
    defaultTransporter,
    gmailTransporter
};