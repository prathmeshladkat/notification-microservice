interface WhatsappPayload {
  notificationId: string;
  userId: string;
  title: string;
  body: string;
  token: string;
}

export const pushHandler = async (payload: WhatsappPayload) => {
  const { token, userId, body, title, notificationId } = payload;
  console.log(notificationId);
};
