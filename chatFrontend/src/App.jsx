import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { Routes, Route, Navigate } from 'react-router-dom'
import  useAuthStore  from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'
 
function App() {
  const { authUser,checkAuth,isCheckingAuth,onlineUsers } = useAuthStore();
  
  const {theme ,setTheme} = useThemeStore();

  console.log({onlineUsers});

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  

  // console.log({authUser});

  if (isCheckingAuth && !authUser)  return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  ); 
  return (
    <>
      <div data-theme={theme}>
        <Navbar />

        <main className="mt-16 px-4 max-w-7xl mx-auto">
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        </main>

        <Toaster />
      </div>
    </>
  )
}

export default App