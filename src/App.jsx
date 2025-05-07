import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@components/Login'
import MainLayout from '@components/layouts/MainLayout'
import Task from '@tasks/Index'
import Tag from '@tags/ListPage'
import TagForm from '@tags/FormPage'
import '@styles/Login.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<MainLayout />} />
          <Route element={<MainLayout />}>
            <Route path="/task" element={<Task />} />
            <Route path="/tag" element={<Tag />} />
            <Route path='/tag/create' element={<TagForm />} />
            <Route path='/tag/edit/:id' element={<TagForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

