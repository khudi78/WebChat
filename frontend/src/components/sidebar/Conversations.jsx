import useGetConversations from "../../hooks/useGetConversations";
import useGetGroups from "../../hooks/useGetGroups"; // Import new hook
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading: loadingConversations, conversations } = useGetConversations();
	const { loading: loadingGroups, groups } = useGetGroups(); // Get groups

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{/* Display One-on-One Conversations */}
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{/* Display Groups */}
			{groups.map((group, idx) => (
				<Conversation
					key={group._id}
					conversation={group} // Use the same Conversation component for groups
					emoji={getRandomEmoji()} // Optionally set a random emoji for groups
					lastIdx={idx === groups.length - 1}
				/>
			))}

			{(loadingConversations || loadingGroups) ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};

export default Conversations;
