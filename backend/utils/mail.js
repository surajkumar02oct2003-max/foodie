const nodemailer = require("nodemailer");

const sendOtpMail = async (email, otp) => {
  try {
    // Create transporter (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: process.env.EMAIL, // your Gmail
        pass: process.env.PASS,  // your App Password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP Code</h2>
        <p>Your OTP for account verification is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    // console.log("OTP email sent:", info.messageId);

    return true;

  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

module.exports = sendOtpMail;
