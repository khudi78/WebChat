



import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		// console.log("selectedConversation._id", selectedConversation._id);
		
		try {
			let res;
			// Check if the selected conversation has a members parameter to determine if it's a group
			if (selectedConversation?.members?.length > 0) {
				// Sending a group message
				res = await fetch(`/api/messages/send/group`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in local storage
					},
					body: JSON.stringify({
						message,
						groupId: selectedConversation._id, // Use groupId when sending a group message
					}),
				});
			} else {
				// Sending a one-to-one message
				res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
					method: "POST",
 				headers: {
 					"Content-Type": "application/json",
 				},
 				body: JSON.stringify({ message }),
				});
			}
			
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
