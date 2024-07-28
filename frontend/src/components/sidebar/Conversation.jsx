

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime"; // Ensure you import the time extraction utility
import { CgProfile } from "react-icons/cg"; // Import the icon

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
    console.log("conversation  " ,conversation);
	// Get the latest message time
	const latestMessageTime = conversation.lastMessage ? extractTime(conversation.lastMessage.createdAt) : '';
    console.log("conversation time " ,extractTime(conversation.updatedAt));
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-slate-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-slate-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				  <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full overflow-hidden flex items-center justify-center'>
                        {conversation.profilePic ? (
                            <img src={conversation.profilePic} alt='User avatar' />
                        ) : (
                            <CgProfile className='text-gray-500 w-12 h-12' /> // Show icon if no image
                        )}
                    </div>
                </div>

				<div className='flex flex-col flex-1 ml-3'>
					<div className='flex justify-between items-center'>
						<p className='font-semibold text-gray-200 font-sans'>{conversation.username}</p>
						<span className='text-xs text-gray-400'>{latestMessageTime}</span> {/* Display latest message time */}
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;

