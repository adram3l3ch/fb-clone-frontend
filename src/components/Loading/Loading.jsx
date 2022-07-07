import axios from "axios";
import React, { useEffect, useState } from "react";
import "./loading.css";

const Loading = ({ show }) => {
	const [quote, setQuote] = useState("");
	const fetchQuote = async () => {
		const { data } = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
		setQuote(data.text);
	};
	useEffect(() => {
		if (!show) {
			fetchQuote();
			setTimeout(() => {
				setQuote(q => {
					if (q) return q;
					return "Your internet is slower than my crushs reply :(";
				});
			}, 3000);
		}
	}, [show]);

	return (
		<section className="loading">
			<div className="loading__circle"></div>
			{quote && (
				<>
					<h2>Do you know?</h2>
					<p>{quote}</p>
				</>
			)}
		</section>
	);
};

export default Loading;
