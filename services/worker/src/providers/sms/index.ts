import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export const sendSMS = async ({
  to,
  body,
}: {
  to: string;
  body: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log("sending sms to:", { to, body });
    await client.messages.create({
      body,
      to,
      from: process.env.TWILIO_SMS_SENDER_NUMBER!,
    });
    return { success: true };
  } catch (error) {
    console.error("SMS sending error:", error);
    return { success: false, error: (error as Error).message };
  }
};
