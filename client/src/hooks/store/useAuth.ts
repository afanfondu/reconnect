import api from '@/utils/api'
import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface User {
  _id: string
  name: string
  email: string
  image: string
}

interface State {
  user: User | null

  setAuth: (credentail: string, toast: any) => Promise<void>
  logout: () => void
}

export const useAuth = create<State>()(
  devtools(
    persist(
      set => ({
        user: null,

        setAuth: async (credential: string, toast: any) => {
          try {
            const res: any = await api
              .post('api/auth/login', {
                json: { credential }
              })
              .json()

            set({
              user: {
                _id: res._id,
                name: res.name,
                email: res.email,
                image: res.image
              }
            })
          } catch (error) {
            console.log(error)
            toast({
              description: 'Something went wrong! Try again later.',
              status: 'error',
              position: 'bottom-right',
              isClosable: true
            })
          }
        },

        logout: () => {
          set({ user: null })
        }
      }),
      { name: 'reconnect-auth' }
    )
  )
)
