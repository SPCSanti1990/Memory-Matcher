// import './App.css;


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Canceled from './pages/Canceled';
import Games from './pages/Game';
import Intro from './pages/Intro';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Stripe from './pages/Stripe';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={<Intro />} />
              <Route path='/Game/:id' element={<PrivateRoutes><Games  /></PrivateRoutes>} />
             <Route path='/Game' element={
                <Navigate to="/Game/beginner"/>}
              /> 
              <Route path='/Profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} />
              <Route path='/Leaderboard' element={<PrivateRoutes><Leaderboard /></PrivateRoutes>} />
              <Route path='/Donate' element={<PrivateRoutes><Stripe /></PrivateRoutes>} />
              <Route path='/Canceled' element={<PrivateRoutes><Canceled /></PrivateRoutes>} />
              <Route path='*' element={<Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '50px',
                  backgroundColor: 'red', // this is the background color
                  padding: '20px', // adding some padding to create space around the text
                }}>
                  Woops! Click me to return home!
                </div></Link>} />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    );
  }
  
  export default App;