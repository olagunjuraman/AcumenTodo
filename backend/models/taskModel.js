const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  text: {
    
    type: String,
  },
  day: {
   
    type: String
  },
  reminder: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("task", TaskSchema);
