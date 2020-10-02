import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import folderCtrl from '../controllers/folder.controller'


const router = express.Router()
router.route('/api/folder/new/:userId')
  .post(authCtrl.requireSignin, folderCtrl.create)
router.route('/api/folder/:folderId')
  .delete(authCtrl.requireSignin, folderCtrl.isCreator, folderCtrl.remove)
router.param('userId', userCtrl.userByID)
router.param('folderId', folderCtrl.folderByID)
export default router