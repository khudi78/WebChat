
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import useGetGroups from "../../hooks/useGetGroups"; // Import your custom hook to get groups

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;

	// Fetch groups using the custom hook
	const { loading, groups } = useGetGroups();

	const [profilePic, setProfilePic] = useState("");

	useEffect(() => {
		if (!loading && groups.length > 0) {
			// Check if the message is from the current user
			if (fromMe) {
				// If the message is from the current user, use their profile picture
				setProfilePic(authUser.profilePic);
			} else {
				// Find the group associated with the message
				const group = groups.find(g => g._id === (message.groupId?message.groupId:message.newMessage?.groupId));
				console.log("group ", group);
				if (group) {
					// Check if the senderId is in the group's members
					const member = group.members.find(member => member._id === (message.senderId?message.senderId:message.newMessage?.senderId));
					if (member) {
						setProfilePic(member.profilePic); // Use the member's profile picture
					} else {
						setProfilePic(selectedConversation?.profilePic); // Fallback to the selected conversation's profile picture
					}
				} else {
					setProfilePic(selectedConversation?.profilePic); // Fallback if group not found
				}
			}
		}
	}, [loading, groups, message.senderId, message.groupId, fromMe, authUser.profilePic, selectedConversation]);

	// Extract and format time for the main message and newMessage (if exists)
	const formattedTime = extractTime(message.createdAt);
	const newMessageTime = extractTime(message.newMessage?.createdAt);

	// Determine chat class name and styling based on sender
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const bubbleBgColor = fromMe ? "bg-[#2b756a]" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	// Choose the appropriate message to display
	const displayedMessage = message.message || message.newMessage?.message;

	// Check if formattedTime is valid
	const isFormattedTimeValid = formattedTime && formattedTime !== 'Invalid date';
	const isNewMessageTimeValid = newMessageTime && newMessageTime !== 'Invalid date';

	// Use formattedTime or newMessageTime for footer
	const footerTime = isFormattedTimeValid 
		? formattedTime 
		: (isNewMessageTimeValid ? newMessageTime : "No time available");

	console.log("message ", message);
	console.log("NewMessage: ", message.newMessage);
	console.log("ProfilePic: ", profilePic); // Log the selected profile picture

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='User profile' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 whitespace-pre-wrap max-w-xs break-words`}>
				{displayedMessage}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{footerTime}
			</div>
		</div>
	);
};

export default Message;
