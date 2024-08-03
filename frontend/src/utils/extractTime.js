


export function extractTime(dateString) {
	// Check if dateString is a valid input
	if (!dateString) {
		return "Invalid date"; // Default message for invalid input
	}

	const date = new Date(dateString);

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		return "Invalid date"; // Return message for invalid date
	}

	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}
