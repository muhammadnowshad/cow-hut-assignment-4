import express from 'express'
// import { ENUM_USER_ROLE } from '../../../enums/user'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'
import validateRequest from '../../middlewares/validateRequest'
import usersController from '../users/users.controller'
// import auth from '../../middlewares/auth'

const router = express.Router()
router.post('/signup', usersController.createUser);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

// router.post(
//   '/change-password',
//   validateRequest(AuthValidation.changePasswordZodSchema),
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.BUYER,
//     ENUM_USER_ROLE.SELLER
//   ),
//   AuthController.changePassword
// )

export const AuthRoutes = router
