import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TbMessages } from "react-icons/tb";
import { useAuthContext } from "../../context/AuthContext";
import { GiCometSpark } from "react-icons/gi";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] w-[600px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className=' bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'></span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName?selectedConversation.fullName:selectedConversation.name}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<div className="flex gap-4">
					<div>Welcome {authUser.fullName} 
					</div>
					<div className=""><GiCometSpark className="text-3xl text-slate-500"/></div>
				</div>
				
				
				<p>Select a chat to start messaging</p>
				<TbMessages  className='text-3xl md:text-6xl text-center text-slate-500' />
			</div>
		</div>
	);
};


