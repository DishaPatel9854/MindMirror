function analyzeSentiment(text) {
  const lower = text.toLowerCase();
  if (lower.includes("happy") || lower.includes("grateful")) return "positive";
  if (lower.includes("sad") || lower.includes("angry")) return "negative";
  return "neutral";
}

module.exports = { analyzeSentiment };
