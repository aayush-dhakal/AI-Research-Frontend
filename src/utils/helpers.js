export const AI_Research_Topics = [
  {
    label: "AI Research for Healthcare",
    value: "AI Research for Healthcare",
  },
  {
    label: "AI Research for Education",
    value: "AI Research for Education",
  },
  {
    label: "AI Research Environment",
    value: "AI Research Environment",
  },
  {
    label: "AI Research for Agriculture",
    value: "AI Research for Agriculture",
  },
  {
    label: "AI Research Disaster Response",
    value: "AI Research Disaster Response",
  },
  {
    label: "AI Research for Infrastructure and Urban Planning",
    value: "AI Research for Infrastructure and Urban Planning",
  },
  {
    label: "AI Research for Conversation",
    value: "AI Research for Conversation",
  },
  {
    label: "AI Research for Ethical AI",
    value: "AI Research for Ethical AI",
  },
];

export const formattedDate = (dateValue) => {
  const date = new Date(dateValue);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
