const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const stripeRoutes = require('./routes/api/Stripe'); // Stripe routes

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
  
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    // Important for MERN Setup: When our application runs from production, it functions slightly differently than in development
    // In development, we run two servers concurrently that work together
    // In production, our Node server runs and delivers our client-side bundle from the dist/ folder 
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      
      app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    app.use('/graphql', expressMiddleware(server));
    
//    server.applyMiddleware({ app });
  
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  };
  
  startApolloServer(typeDefs, resolvers);
  