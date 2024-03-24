import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Profile from './pages/Profile.js'
import Leaderboard from './pages/Leaderboard.js'
import Intro from './pages/Intro.js'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)