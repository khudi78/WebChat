import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();
    // console.log("messages", messages);
	console.log("hola");
		useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			console.log("useListenMessagesop");

			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;





// useListenMessages.js

// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//     const { socket } = useSocketContext();
//     const { messages, setMessages } = useConversation();

//     useEffect(() => {
//         const handleNewMessage = (newMessage) => {
//             console.log("Received new message:", newMessage);
//             newMessage.shouldShake = true;
//             const sound = new Audio(notificationSound);
//             sound.play();
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         };

//         const handleNewGroupMessage = (newGroupMessage) => {
//             console.log("Received new group message:", newGroupMessage);
//             newGroupMessage.shouldShake = true;
//             const sound = new Audio(notificationSound);
//             sound.play();
//             setMessages((prevMessages) => [...prevMessages, newGroupMessage.message]);
//         };

//         socket?.on("newMessage", handleNewMessage);
//         socket?.on("newGroupMessage", handleNewGroupMessage);

//         return () => {
//             socket?.off("newMessage", handleNewMessage);
//             socket?.off("newGroupMessage", handleNewGroupMessage);
//         };
//     }, [socket, setMessages]);
// };

// export default useListenMessages;
