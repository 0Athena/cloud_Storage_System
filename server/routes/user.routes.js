import express from 'express'
import userCtrl from '../controllers/user.controller'
import authController from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
.get(userCtrl.list)
.post(userCtrl.create)

router.route('/api/users/:userID')
.get(authController.requireSignin,userCtrl.read)
.put(authController.requireSignin,authController.hasAuthorization,userCtrl.update)
.delete(authController.requireSignin,authController.hasAuthorization,userCtrl.remove)

router.param('userID', userCtrl.userByID)
export default router
