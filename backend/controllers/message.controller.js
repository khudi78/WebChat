import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import Group from "../models/group.model.js"; // Import your Group model

// messageController.js

export const sendMessage = async (req, res) => {
    try {
        const { message, groupId } = req.body; // Expecting groupId in the request body for group messages
        const senderId = req.user._id;
        console.log("groupId", groupId);
        if (groupId) {
            // Handle group message
            const group = await Group.findById(groupId);

            if (!group) {
                return res.status(404).json({ error: "Group not found" });
            }

            // Create a new message
            const newMessage = new Message({
                senderId,
                message,
                groupId,
            });

            // Save the message to the group
            group.messages.push(newMessage._id);
            await Promise.all([group.save(), newMessage.save()]);

            // Emit to all group members
            group.members.forEach((memberId) => {
                const receiverSocketId = getReceiverSocketId(memberId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newMessage", {
                         newMessage,
                        //groupId: group._id,
                    });
                }
            });

            return res.status(201).json(newMessage);
        } else {
            // Handle one-to-one message
            const { id: receiverId } = req.params;

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                });
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message,
            });

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            await Promise.all([conversation.save(), newMessage.save()]);

            // Emit to the receiver only
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }

            return res.status(201).json(newMessage);
        }
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getMessages = async (req, res) => {
  try {
    const { id: chatId } = req.params; // Use a more generic name
    const senderId = req.user._id;

    // Check if chatId is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(chatId)) {
    // 	return res.status(400).json({ error: "Invalid chat ID" });
    // }

    // First, check if the ID corresponds to a group
    const group = await Group.findById(chatId).populate("messages"); // Fetch group messages
    if (group) {
      // Optionally, you can also check if the sender is a member of the group
      if (!group.members.includes(senderId)) {
        return res
          .status(403)
          .json({ error: "You are not a member of this group" });
      }
      return res.status(200).json(group.messages); // Return group messages
    }

    // If it's not a group, check for a one-to-one conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]); // No messages found
    }

    const messages = conversation.messages;
    res.status(200).json(messages); // Return one-to-one messages
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body; // Get group name and members from the request
    const creatorId = req.user._id; // Get creator ID from authenticated user

    const newGroup = new Group({
      name,
      members: [creatorId, ...members], // Add creator to members
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.log("Error in createGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// fetch groups
export const fetchGroup = async (req, res) => {
  try {
    console.log("Fetching groups");
    const userId = req.user._id;
    const groups = await Group.find({ members: userId }).populate("members");
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error in fetchGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a user to an existing group
export const addUserToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body; // Get group ID and user ID from request
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ error: "User already in the group" });
    }

    group.members.push(userId); // Add user to group members
    await group.save();

    res.status(200).json(group);
  } catch (error) {
    console.log("Error in addUserToGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove a user from an existing group
export const removeUserFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body; // Get group ID and user ID from request
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (!group.members.includes(userId)) {
      return res.status(400).json({ error: "User not in the group" });
    }

    group.members = group.members.filter(
      (member) => member.toString() !== userId
    ); // Remove user from group members
    await group.save();

    res.status(200).json(group);
  } catch (error) {
    console.log("Error in removeUserFromGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
