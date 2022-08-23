import type { CorsOptions } from 'cors'

export const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
  // credentials: true,
}
