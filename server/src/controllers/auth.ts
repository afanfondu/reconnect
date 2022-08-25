import { Request, Response } from 'express'
import jwt_decode from 'jwt-decode'
import User from '../models/User'

/**
 * @desc    login
 * @route   POST /api/auth/login
 * @access  public
 */
export const login = async (req: Request, res: Response) => {
  const { credential } = req.body

  try {
    const decoded: any = jwt_decode(credential)

    const user = await User.findOne({ email: decoded.email })

    if (user) {
      res.send(user)
      return
    }

    const newUser = await User.create({
      name: decoded.name,
      email: decoded.email,
      image: decoded.picture
    })

    res.status(201).send(newUser)
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}
