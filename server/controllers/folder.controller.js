import Folder from '../models/folder.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'

const create = async(req, res, next) => {
  const folder = new Folder(req.body)
	folder.createdBy = req.profile
    try{
        await folder.save() 
        return res.status(200).json({
            message: "folder created successfully"
        })
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const folderByID = async (req, res, next, id) => {
  try{
    let folder = await Folder.findById(id).populate('createdBy', '_id name').exec()
    if (!folder)
      return res.status('400').json({
        error: "folder not found"
      })
    req.folder = folder
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve use folder"
    })
  }
}

const remove = async (req, res) => {
  let folder = req.folder
  try{
      if(folder.filesNum == 0 ){
        let deletedfolder = await folder.remove()
        res.json(deletedfolder)
    }
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isCreator = (req, res, next) => {
  let isCreator = req.folder && req.auth && req.folder.createdBy._id == req.auth._id
  if(!isCreator){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  create,
  folderByID,
  remove,
  isCreator
}
