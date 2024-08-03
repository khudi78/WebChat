import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetGroups = () => {
	const [loading, setLoading] = useState(false);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const getGroups = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/messages/grp/groups", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the token in local storage
					},
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Failed to fetch groups");
				}
				setGroups(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getGroups();
	}, []);

	return { loading, groups };
};

export default useGetGroups;
