const FAQ_RULES = [
  {
    keywords: ["refund", "refund policy"],
    answer:
      "Our refund policy allows refund requests within 7 days of purchase, subject to plan eligibility.",
  },
  {
    keywords: ["shipping", "delivery"],
    answer: "Standard shipping usually takes 3 to 5 business days after order confirmation.",
  },
  {
    keywords: ["pricing", "plan", "subscription"],
    answer: "We offer flexible pricing plans. Please check the pricing page for the latest plan details.",
  },
  {
    keywords: ["reset password", "forgot password", "password"],
    answer: "You can reset your password from the login page by clicking the 'Forgot Password' option.",
  },
  {
    keywords: ["support hours", "working hours", "business hours"],
    answer: "Our support team is available Monday to Friday from 9 AM to 6 PM.",
  },
];

const normalizeQuery = (query) => query.trim().toLowerCase();

export const findRuleMatch = (query) => {
  const normalizedQuery = normalizeQuery(query);

  return (
    FAQ_RULES.find((rule) =>
      rule.keywords.some((keyword) => normalizedQuery.includes(keyword))
    ) || null
  );
};
