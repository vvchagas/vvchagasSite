export const MESSAGE_TOPICS = ["web", "ti", "assistencia-tecnica"] as const;

export type MessageTopic = (typeof MESSAGE_TOPICS)[number];

export const MESSAGE_TOPIC_LABELS: Record<MessageTopic, string> = {
  web: "Web",
  ti: "TI",
  "assistencia-tecnica": "Assistência técnica",
};

export interface ContactMessage {
  id: string;
  name: string;
  contact: string;
  topic: MessageTopic;
  source: string;
  message: string;
  createdAt: string;
}

export function isMessageTopic(value: unknown): value is MessageTopic {
  return typeof value === "string" && MESSAGE_TOPICS.includes(value as MessageTopic);
}
