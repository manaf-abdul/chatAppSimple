const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema(
    {
      members:
       [{
        type :Schema.Types.ObjectId, 
        ref: 'User' 
    }]
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Chat", ChatSchema);
  