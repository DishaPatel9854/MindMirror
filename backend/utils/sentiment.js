function analyzeSentiment(text) {
  const positiveWords = ['happy', 'joy', 'love', 'excited', 'good'];
  const negativeWords = ['sad', 'angry', 'bad', 'hate', 'upset'];

  const lowerText = text.toLowerCase();

  if (positiveWords.some(word => lowerText.includes(word))) return 'positive';
  if (negativeWords.some(word => lowerText.includes(word))) return 'negative';

  return 'neutral';
}

module.exports = { analyzeSentiment };
