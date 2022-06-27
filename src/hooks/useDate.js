import { months } from "../DATE";

const useDate = date => {
	if (!date) return "";
	let newDate = new Date(date);
	newDate = `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
	return newDate;
};

export default useDate;
