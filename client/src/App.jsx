import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicResume from './pages/PublicResume'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ResumeEditor from './pages/ResumeEditor'
import UploadResume from './pages/UploadResume'
import Templates from './pages/Templates'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<ResumeEditor />} />
        <Route path="/editor/:id" element={<ResumeEditor />} />
        <Route path="/resume/:publicId" element={<PublicResume />} />
        <Route path="/upload-resume" element={<UploadResume />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App