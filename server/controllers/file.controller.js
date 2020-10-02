import File from '../models/file.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

const create = async(req, res, next) => {
    const file = new File(req.body)
    file.uploadedBy = req.profile
    file.parentFolder = req.folder
    
    try{
        await file.save() 
        return res.status(200).json({
            message: "successfully file created"
        })
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
	
}

const fileByID = async (req, res, next, id) => {
  try{
    let file = await File.findById(id).populate('uploadedBy', 'parentFolder', '_id name').exec()
    if (!file)
      return res.status('400').json({
        error: "file not found"
      })
    req.file = file
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve use file"
    })
  }
}

const listContent = async (req, res) => {
  try {
    let content = await File.find({parentFolder: req.folder._id}).populate('parentFolder', '_id name').skip((parseInt(req.query.page)-1)*20).limit(20).exec()
    let total_results = await File.find({parentFolder: req.folder._id}).count()
    res.json({"page": req.query.page,"total_results":total_results,"total_pages": Math.ceil(total_results / 20) ,"results": content})
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const remove = async (req, res) => {
  let file = req.file
  file.parentFolder = req.folder
  try{
    let deletedfile = await file.remove()
    file.parentFolder.filesNum -= 1
    res.json(deletedfile)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.file.photo.contentType)
    return res.send(req.file.photo.data)
}

const isCreator = (req, res, next) => {
  let isCreator = req.file && req.auth && req.file.uploadedBy._id == req.auth._id
  if(!isCreator){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  create,
  fileByID,
  listContent,
  remove,
  photo,
  isCreator
}
