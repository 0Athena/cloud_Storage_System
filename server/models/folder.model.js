import mongoose from 'mongoose'
const FolderSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    unique: 'folder name is already exist',
    required: 'Name is required'
  },
  filesNum: { 
      type: Number 
  },
  updated: Date,
  sharedBy: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  created: { 
      type: Date, 
      default: Date.now 
  } 
})

export default mongoose.model('Folder', FolderSchema)