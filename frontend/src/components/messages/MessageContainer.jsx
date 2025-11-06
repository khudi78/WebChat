import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TbMessages } from "react-icons/tb";
import { useAuthContext } from "../../context/AuthContext";
import { GiCometSpark } from "react-icons/gi";
import axios from "axios";
import useGetConversationDetails from "../../hooks/useGetConversationDetails";
import { useNavigate } from "react-router-dom";

const MessageContainer = () => {
  const { authUser } = useAuthContext();
  const [existingConversation, setExistingConversation] = useState(null);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { conversationDetails } = useGetConversationDetails();
  const navigate = useNavigate();

  console.log("conversationDetails:", conversationDetails);
  console.log("selectedConversation:", selectedConversation);

  // const downloadChat = async (conversationId) => {
  //   try {
  //     console.log("🔍 Searching for conversation with ID:", conversationId);
  //     console.log("🧩 conversationDetails:", conversationDetails);

  //     const allConversations = conversationDetails?.conversations || [];

  //     if (!Array.isArray(allConversations) || allConversations.length === 0) {
  //       console.log("⚠️ No conversations loaded yet");
  //       return;
  //     }

  //     const match = allConversations.find((conv) => {
  //       if (!Array.isArray(conv.participants)) return false;
  //       console.log("Checking conversation:", conv.participants);

  //       const participantIds = conv.participants
  //   .map((p) => p?.toString?.())
  //   .filter(Boolean);

  //       console.log("participantIds:", participantIds);

  //       return (
  //         participantIds.includes(authUser._id?.toString?.()) &&
  //         participantIds.includes(conversationId?.toString?.())
  //       );
  //     });

  //     if (!match) {
  //       console.log("⚠️ No existing conversation found");
  //       return;
  //     }

  //     console.log("✅ Found conversation:", match);

  //     const res = await axios.get(`/api/messages/export/${match._id}`
  //       , {
  //       responseType: "blob",
  //     });

  //     const url = window.URL.createObjectURL(new Blob([res.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "chat");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //   } catch (error) {
  //     console.error("❌ Error downloading chat:", error);
  //   }
  // };

  const sendChatToAnalysis = async (conversationId) => {
    try {
      console.log("Sending chat for analysis, ID:", conversationId);

      const allConversations = conversationDetails?.conversations || [];
      const match = allConversations.find((conv) => {
        const participantIds =
          conv.participants?.map((p) => p?.toString?.()) || [];
        return (
          participantIds.includes(authUser._id?.toString?.()) &&
          participantIds.includes(conversationId?.toString?.())
        );
      });

      if (!match) {
        console.log("⚠️ No matching conversation found");
        return;
      }
      console.log("fetching chat for conversation:");
      // Fetch chat messages for this conversation
      const res = await axios.get(`/api/messages/export/${match._id}`, {
        responseType: "blob",
      });
      console.log("Chat fetched, sending to analysis backend");
      // Prepare file-like object
      const file = new File([res.data], "chat.txt", { type: "text/plain" });

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"));

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("📄 File content preview:\n", e.target.result);
      };
      reader.readAsText(formData.get("file"));

      // Send to Flask backend
      // const response = await axios.post("http://127.0.0.1:5000/upload-chat", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // console.log(response.data);
      // console.log("Chat sent for analysis successfully");
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/upload-chat",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("✅ Response received from Flask:");
        console.log(response.data);
        console.log("Chat sent for analysis successfully");
        navigate("/chat-analysis");
      } catch (error) {
        console.error("❌ Error sending chat to Flask backend:", error);
      }
      // Redirect to chat-analysis page
      
    } catch (error) {
      console.error("❌ Error sending chat for analysis:", error);
    }
  };

  useEffect(() => {
    // cleanup function (unmounts)
    console.log("hi");
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] w-[600px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className=" bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text"></span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName
                ? selectedConversation.fullName
                : selectedConversation.name}
            </span>
            <button
              onClick={() => sendChatToAnalysis(selectedConversation._id)}
              className="bg-green-400 text-white px-3 py-1 rounded"
            >
              Export Chat
            </button>
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
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <div className="flex gap-4">
          <div>Welcome {authUser.fullName}</div>
          <div className="">
            <GiCometSpark className="text-3xl text-slate-500" />
          </div>
        </div>

        <p>Select a chat to start messaging</p>
        <TbMessages className="text-3xl md:text-6xl text-center text-slate-500" />
      </div>
    </div>
  );
};
