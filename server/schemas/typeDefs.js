

// template typeDefs, subject to change
const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        highScore: Int
        lastScore: Int
        friends: [User]!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Score {
        value: Int
        highScore: Boolean
        difficulty: String
        player: User
    }
    type Query {
        me: User
        checkHighScore(player: ID!, difficulty: String!): Score
        leaderboard: [Score]
        profile: [Score]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveScore(value: Int!, highScore: Boolean!, difficulty: String, player: ID!): Score
        updateOldHigh(difficulty: String, player: ID!): Score
        updatePlayerHigh(_id: ID!, highScore: Int!): User
        lastScore(_id: ID!, lastScore: Int!): User
        deleteScores(player: ID!): User
    }
`;

module.exports = typeDefs;