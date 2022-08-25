import { useAuth } from './hooks/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Fonts, Scrollbar } from './components/others'
import { Home, Login } from './components/pages'

function App() {
  const user = useAuth(state => state.user)

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Fonts />
      <Scrollbar />

      {user ? <Home /> : <Login />}
    </GoogleOAuthProvider>
  )
}

export default App
