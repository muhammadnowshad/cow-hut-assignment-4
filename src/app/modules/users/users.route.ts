import express from 'express'
import usersController from './users.controller'

const router = express.Router()


router.get('/:id', usersController.getSingleUser)
router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)
router.get('/', usersController.getAllUsers)

export const UserRoutes = router
