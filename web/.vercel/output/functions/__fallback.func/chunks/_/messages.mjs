const MESSAGE_TOPICS = ["web", "ti", "assistencia-tecnica"];
const MESSAGE_TOPIC_LABELS = {
  web: "Web",
  ti: "TI",
  "assistencia-tecnica": "Assist\xEAncia t\xE9cnica"
};
function isMessageTopic(value) {
  return typeof value === "string" && MESSAGE_TOPICS.includes(value);
}

export { MESSAGE_TOPIC_LABELS as M, isMessageTopic as i };
//# sourceMappingURL=messages.mjs.map
