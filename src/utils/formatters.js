export const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(timestamp));
};

export const toSentenceCase = (value) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
