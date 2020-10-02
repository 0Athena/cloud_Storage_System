import mongoose from 'mongoose'
const FileSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    unique: 'file name is already exist',
    required: 'Name is required'
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  updated: Date,
  parentFolder: {type: mongoose.Schema.ObjectId, ref: 'Folder'},
  uploadedBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  created: { 
      type: Date, 
      default: Date.now 
  } 
})

export default mongoose.model('File', FileSchema)