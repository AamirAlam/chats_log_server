const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    createdAt: {
      type: String
    },
    _v: {
      type: String
    },
    intent_matched: {
      type: String
    },
    psid: {
      type: String
    },
    sender: {
      type: String
    },
    sessionId: {
      type: String
    },
    timestamp: {
      type: String
    },
    updatedAt: {
      type: String
    }
  },
  { 
    collection: "chat"
  }
);

module.exports = Chat = mongoose.model("chat", ChatSchema);
