const { User, Score } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            // Retrieve user data if logged in
            return User.findOne({ _id: context.user._id }).select('-__v -password');
          }
          throw new Error('You need to be logged in!'); // Throw an error if not logged in
        },
        checkHighScore: async (parent, { player, difficulty }, context) => {
          return Score.findOne({player: player, difficulty: difficulty, highScore: true})
        },
        leaderboard: async (parent, args) => {
          return Score.find({}).sort({value: 1}).populate({path: "player", model: "User"})
        },
        profile: async (parent, args, context) => {
          return Score.find({player: context.user._id, highScore: true}).populate({path: "player", model: "User"})
        }
    },

    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        // Create a new user
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        // User login
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new Error('User not found. Do you have an account?');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new Error('Incorrect credentials!');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      saveScore: async (parent, {value, highScore, difficulty, player}, context) => {
        return await Score.create({
          value,
          highScore,
          difficulty,
          player
        })
      },
      updateOldHigh: async (parent, { difficulty, player }, context) => {
        return await Score.findOneAndUpdate(
          { difficulty: difficulty, player: player, highScore: true },
          { highScore: false },
          { new: true }
        )
      },
      updatePlayerHigh: async (parent, { _id, highScore, }, context) => {
        return await User.findOneAndUpdate(
          { _id:  _id},
          { highScore: highScore },
          { new: true }
        )
      },
      lastScore: async (parent, {_id, lastScore }, context) => {
        return await User.findOneAndUpdate(
          { _id: _id },
          { lastScore: lastScore},
          { new: true }
        )
      },
      deleteScores: async (parent, { player }, context) => {
        await Score.deleteMany({player: player})
  
        return await User.findOneAndUpdate(
          {_id: player},
          { highScore: 99, lastScore: 99},
          { new: true }
        )
      }
    },
  };
  
  module.exports = resolvers;