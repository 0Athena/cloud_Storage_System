import mongoose from 'mongoose'
const SubfolderSchema = new mongoose.Schema({

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
  },
  parentFolder: [{type: mongoose.Schema.ObjectId, ref: 'Folder'}]
})

export default mongoose.model('Subfolder', SubfolderSchema)