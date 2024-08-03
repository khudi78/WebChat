import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	console.log("selectedConversation._id", selectedConversation._id);

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
				
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
				console.log("hiii");
        
		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);
	console.log("herooo");

	return { messages, loading };
};
export default useGetMessages;

