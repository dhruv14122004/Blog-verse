import React, { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppContext } from './context/AppContext.jsx'
import ProtectedRoute from './guards/ProtectedRoute.jsx'

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Layout = lazy(() => import('./pages/admin/Layout.jsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const Bloglist = lazy(() => import('./pages/admin/Bloglist.jsx'))
const Comments = lazy(() => import('./pages/admin/Comments.jsx'))
const Addblog = lazy(() => import('./pages/admin/Addblog.jsx'))

// Components
import Login from './components/admin/Login.jsx' // Keep login eager for faster First Contentful Paint if possible, or lazy it too.
import SmoothScroll from './components/effects/SmoothScroll.jsx'

// Loading Fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  // Note: useAppContext is used by ProtectedRoute, but we keep it here if needed for top-level logic
  return (
    <div>
      <Toaster />
      <SmoothScroll />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='listblog' element={<Bloglist />} />
            <Route path='comments' element={<Comments />} />
            <Route path="addblog" element={<Addblog />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
