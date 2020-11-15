const { Schema, model } = require("mongoose");
module.exports = model("tag",new Schema({
    Guild: String,
    Command: String,
    Content: String,
    MessageID: String,
  })
);