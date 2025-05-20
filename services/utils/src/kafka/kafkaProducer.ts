import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-api",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();

export const initKafkaProducer = async () => {
  await producer.connect();
};

export const produceNotification = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};
