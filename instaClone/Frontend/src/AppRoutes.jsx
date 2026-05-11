import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Feed from './features/posts/pages/Feed';
import CreatePost from './features/posts/pages/CreatePost';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Feed />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
