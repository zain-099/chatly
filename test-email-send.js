const nodemailer = require("nodemailer");

// Load env vars
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

console.log("SMTP Config:");
console.log("  Host:", process.env.SMTP_HOST);
console.log("  Port:", process.env.SMTP_PORT);
console.log("  Secure:", process.env.SMTP_SECURE);
console.log("  User:", process.env.SMTP_USERNAME);
console.log("  From:", process.env.NEXT_PUBLIC_SMTP_FROM);
console.log("");

const testEmail = "abdelrahman.abdelazeiz@gmail.com";

console.log("Sending test email to:", testEmail);

transporter
  .sendMail({
    from: process.env.NEXT_PUBLIC_SMTP_FROM,
    to: testEmail,
    subject: "Test Email from Typebot",
    html: "<h1>Test</h1><p>This is a test email.</p>",
  })
  .then((result) => {
    console.log("✅ Email sent successfully!");
    console.log("Result:", result);
  })
  .catch((error) => {
    console.error("❌ Failed to send email:");
    console.error("Error:", error.message);
    console.error("Full error:", error);
  });
