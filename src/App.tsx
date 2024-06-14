import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/use-auth.hook'
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
  const { loading, user } = useAuth();

  console.log('user', user)

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? authenticatedRoutes : unauthenticatedRoutes
}

const unauthenticatedRoutes = (
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
)

const authenticatedRoutes = (
  <Routes>
    <Route path='/home' element={<Home />} />
    <Route path='profile' element='profile' />
  </Routes>
)

export default App
