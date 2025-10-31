import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversationDetails = () => {
    const [loading, setLoading] = useState(false);
    const [conversationDetails, setConversationDetails] = useState([]);

    useEffect(() => {
        const getConversationDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/messages/detail/getConversationDetails");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversationDetails(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversationDetails();
    }, []);

    return { loading, conversationDetails };
};
export default useGetConversationDetails;
