import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Feed from './features/posts/pages/Feed';
import CreatePost from './features/posts/pages/CreatePost';
import Profile from './features/auth/pages/Profile';
import ProtectedRoute from './features/shared/components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>

        <Route path='/' element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        } />
        <Route path='/create-post' element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
