import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, verificationCode: number) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: 'the-movie-tracker@no-reply.com',
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is ${verificationCode}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};