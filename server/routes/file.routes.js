import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import folderCtrl from '../controllers/folder.controller'
import fileCtrl from '../controllers/file.controller'

const router = express.Router()
router.route('/api/file/new/:userId/:folderId')
  .post(authCtrl.requireSignin, fileCtrl.create)
  .get(fileCtrl.listContent)
router.route('/api/files/:fileId/:folderId')
  .delete(authCtrl.requireSignin, fileCtrl.isCreator, fileCtrl.remove)
router.param('userId', userCtrl.userByID)
router.param('folderId', folderCtrl.folderByID)
router.param('fileId', fileCtrl.fileByID)
export default router