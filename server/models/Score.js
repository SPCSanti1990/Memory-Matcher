const { Schema, model } = require('mongoose');

const scoreSchema = new Schema(
  {
    value: {
        type: Number,
        required: true
    },
    highScore: {
        type: Boolean,
        required: true,
        default: false
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      required: true
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  },
);

const Score = model('Score', scoreSchema);

module.exports = Score;