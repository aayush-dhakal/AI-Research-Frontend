export const AI_Research_Topics = [
  {
    label: "AI Research for Healthcare",
    value: "AI Research for Healthcare",
    src: "/assets/images/category/healthcare.jpg",
  },
  {
    label: "AI Research for Education",
    value: "AI Research for Education",
    src: "/assets/images/category/education.jpg",
  },
  {
    label: "AI Research for Environment",
    value: "AI Research for Environment",
    src: "/assets/images/category/environment.jpg",
  },
  {
    label: "AI Research for Agriculture",
    value: "AI Research for Agriculture",
    src: "/assets/images/category/agriculture.jpg",
  },
  {
    label: "AI Research for Disaster Response",
    value: "AI Research for Disaster Response",
    src: "/assets/images/category/disaster.jpg",
  },
  {
    label: "AI Research for Infrastructure and Urban Planning",
    value: "AI Research for Infrastructure and Urban Planning",
    src: "/assets/images/category/infrastructure.jpg",
  },
  {
    label: "AI Research for Conservation",
    value: "AI Research for Conservation",
    src: "/assets/images/category/conservation.jpg",
  },
  {
    label: "AI Research for Ethical AI",
    value: "AI Research for Ethical AI",
    src: "/assets/images/category/ethical.jpg",
  },
];

export const formattedDate = (dateValue, smallMonth) => {
  const date = new Date(dateValue);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: smallMonth ? "short" : "long",
    day: "numeric",
  });
};

export const getYear = (dateValue) => {
  const date = new Date(dateValue);

  return date.getFullYear();
};
