import express from 'express'
import * as auth from '../controllers/auth'

const router = express.Router()

router.route('/login').post(auth.login)

export default router
