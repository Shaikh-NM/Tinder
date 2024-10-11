import Message from "../models/message.model.js";

export async function sendMessage(req, res) {
  try {
    const { receiverId, content } = req.body;
    const sender = await User.findById(req.user.userId);

    const newMessage = await Message.create({
      sender: sender._id,
      receiver: receiverId,
      content,
    });

    return res.status(200).json({ success: true, newMessage });
  } catch (error) {
    console.error("error in send message controller : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getConversation(req, res) {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [{ sender: req.user.userId, receiver: userId }],
    }).sort("createdAt");

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("error in send message controller : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
