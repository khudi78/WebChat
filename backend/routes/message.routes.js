import express from "express";
import { getMessages, sendMessage, createGroup, addUserToGroup,removeUserFromGroup, fetchGroup } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
// Route to create a new group
router.post("/create", protectRoute, createGroup);
router.post("/send/group", protectRoute, sendMessage); // For group messages

router.get("/grp/groups", protectRoute, fetchGroup);
// Route to add a user to a group
router.post("/addUser", protectRoute, addUserToGroup);

// Route to remove a user from a group
router.post("/removeUser", protectRoute, removeUserFromGroup);

export default router;
