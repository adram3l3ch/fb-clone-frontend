export default process.env.NODE_ENV === "development"
	? "http://localhost:5000"
	: "https://amie.up.railway.app";
