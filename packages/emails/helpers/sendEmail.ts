import { env } from "@typebot.io/env";
import { createTransport, type SendMailOptions } from "nodemailer";

export const sendEmail = async (
  props: Pick<SendMailOptions, "to" | "html" | "subject" | "replyTo" | "text">,
) => {
  console.log("[sendEmail] Creating transporter with config:", {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    user: env.SMTP_USERNAME,
    from: env.NEXT_PUBLIC_SMTP_FROM,
  });

  const transporter = createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USERNAME,
      pass: env.SMTP_PASSWORD,
    },
  });

  try {
    console.log("[sendEmail] Sending email to:", props.to);
    const result = await transporter.sendMail({
      from: env.NEXT_PUBLIC_SMTP_FROM,
      ...props,
    });
    console.log("[sendEmail] Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("[sendEmail] Failed to send email:", error);
    throw error;
  }
};
