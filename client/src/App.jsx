import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Layout from './pages/admin/Layout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Bloglist from './pages/admin/Bloglist.jsx'
import Comments from './pages/admin/Comments.jsx'
import Addblog from './pages/admin/Addblog.jsx' 
import Login from './components/admin/Login.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/admin' element={true ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}></Route>
          <Route path='listblog' element={<Bloglist/>}></Route>
          <Route path='comments' element={<Comments/>}></Route>
          <Route path="addblog" element={<Addblog/>}></Route>
        </Route>  
      </Routes>
    </div>
  )
}

export default App
