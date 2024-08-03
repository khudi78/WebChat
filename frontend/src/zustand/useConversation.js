

import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => {
        console.log("Selected Conversation:", selectedConversation);
        set({ selectedConversation });
    },
    messages: [],
    setMessages: (messages) => {
        console.log("Messages Updated:", messages);
        set({ messages });
    },
}));

export default useConversation;
