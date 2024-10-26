const Chat = require("../../models/chatModel");

// Get all chats
exports.getChats = async (args, { req }) => {
  try {
    const chats = await Chat.find({ roomId: req.params.id }).populate("sender");
    return chats;
  } catch (err) {
    console.log(err);
    throw err;
  }
};