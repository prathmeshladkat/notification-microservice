import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const sendWhatsApp = async ({
  to,
  templateParams,
}: {
  to: string;
  templateParams: string[];
}) => {
  try {
    const payload = {
      messages: [
        {
          from: process.env.INFOBIP_WHATSAPP_SENDER,
          to: to,
          messageId: uuidv4(), // required in Infobip API
          content: {
            templateName: process.env.INFOBIP_TEMPLATE_NAME,
            templateData: {
              body: {
                placeholders: templateParams,
              },
            },
            language: "en", // or from env if needed
          },
        },
      ],
    };

    const response = await axios.post(
      `${process.env.INFOBIP_BASE_URL}/whatsapp/1/message/template`,
      payload,
      {
        headers: {
          Authorization: `App ${process.env.INFOBIP_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ WhatsApp message sent:", response.data);
    return { success: true, data: response.data };
  } catch (err: any) {
    console.error(
      "❌ WhatsApp message error:",
      JSON.stringify(err.response?.data, null, 2)
    );
    return { success: false, error: err.response?.data || err.message };
  }
};
