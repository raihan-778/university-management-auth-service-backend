import express, { Router } from 'express'
import usersController from './users.controller'

const router: Router = express.Router()

router.post('/create-user', usersController.createUserToDB)

export default router
