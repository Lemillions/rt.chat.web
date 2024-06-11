import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/use-auth.hook'
import Login from './pages/login';
import Register from './pages/register';

function App() {
  const { loading, user } = useAuth();

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
    <Route path='/' element='dashboard' />
    <Route path='profile' element='profile' />
  </Routes>
)

export default App
