const mongoose = require('mongoose');

// Schema for game database on mongo DB
const GameSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    gameLevel: {
      type: String,
    },
    numOfMoves: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  });
  
  module.exports = mongoose.model('games', GameSchema);