const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

console.log("Testing SMTP connection...");
console.log("Host:", process.env.SMTP_HOST);
console.log("Port:", process.env.SMTP_PORT);
console.log("User:", process.env.SMTP_USERNAME);

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
    process.exit(1);
  } else {
    console.log("SMTP Server is ready to take our messages");
    process.exit(0);
  }
});
