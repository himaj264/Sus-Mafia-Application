const Chat = require("../models/chatModel");
const Room = require("../models/roomModel");

exports.getRooms = async (req, res) => {
  const rooms = await Room.find({$or: [
    {p1: req.user._id},
    {p2: req.user._id}
  ]}).populate('p1 p2');
  
  res.status(200).json(rooms);
};

exports.newConversation = async (req, res) => {
  const { receiver } = req.body;
  
  const myRoom = await Room.findOne({$or: [
    {p1: req.user._id, p2: receiver},
    {p1: receiver, p2: req.user._id}
  ]}).populate('p1 p2');

  if(myRoom) {
    res.status(200).json(myRoom);
  }
  else {
    const newRoom = new Room({
      p1: req.user._id,
      p2: receiver,
    });
    const resp = await newRoom.save();
    const room = await Room.findById(resp._id).populate('p1 p2');
    res.status(200).json(room);
  }
};

exports.getChats = async (req, res) => {
  const chats = await Chat.find({ roomId: req.params.id }).populate("sender");
  res.status(200).json(chats);
};

exports.deleteMsg = async (req, res) => {
  const resp = await Chat.findByIdAndDelete(req.params.id);
  return res.status(200).json(resp);
};
