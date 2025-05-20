import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  try {
    if (!to || !subject || !body) {
      return { success: false, error: "Missing to/subject/body fields" };
    }

    // Use nodemailer or any service to send email
    await transport.sendMail({
      from: "rladkat877@gmail.com",
      sender: "rladkat877@gmail.com",
      to: to,
      subject: subject,
      text: body,
    });

    // Simulate success
    return { success: true };
  } catch (err) {
    console.error("❌ Email sending error:", err);
    return { success: false, error: (err as Error).message };
  }
};
