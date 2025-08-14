const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:    { type: String, required: true },
  date:    { type: Date, default: Date.now },
  mood:    { type: String, enum: ['positive', 'negative', 'neutral'], required: true },
  tags:    [String],
});

module.exports = mongoose.model('Journal', JournalSchema);
