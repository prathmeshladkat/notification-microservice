export enum Channel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WHATSAPP = "WHATSAPP",
}

export enum Status {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
}

export interface NotificationPayload {
  notificationId: string;
  userId: string;
  title: string;
  body: string;
  emailTo?: string;
  smsTo?: string;
  pushToken?: string;
  whatsapp?: string;
  channel: Channel;
}
