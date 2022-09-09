import { useAuth, useSocket } from './hooks/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Fonts, Scrollbar } from './components/others'
import { Home, Login } from './components/pages'
import { useEffect } from 'react'

function App() {
  const user = useAuth(state => state.user)

  const setSocket = useSocket(state => state.setSocket)

  useEffect(()=> {
    if(!user) return

    setSocket(user._id)
  }, [user])

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Fonts />
      <Scrollbar />

      {user ? <Home /> : <Login />}
    </GoogleOAuthProvider>
  )
}

export default App
