import axios from "axios";
import React, { useEffect, useState } from "react";
import "./loading.css";

let timeout;
const controller = new AbortController();
const initialQuote =
	"Nothing can stop the man with the right mental attitude from achieving his goal; nothing on earth can help the man with the wrong mental attitude.";

const Loading = ({ show }) => {
	const [quote, setQuote] = useState(initialQuote);
	const fetchQuote = async () => {
		try {
			const { data } = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en", {
				signal: controller.signal,
			});
			setQuote(data.text);
		} catch (err) {}
	};
	useEffect(() => {
		if (!show) {
			fetchQuote();
			timeout = setTimeout(() => {
				setQuote(q => {
					if (q !== initialQuote) return q;
					return "Your internet is slower than my crushs reply :(";
				});
			}, 3000);
		}
		return () => {
			clearTimeout(timeout);
			controller.abort();
		};
	}, [show]);

	return (
		<section className="loading">
			<div className="loading__circle"></div>
			<h2>Do you know?</h2>
			<p>{quote}</p>
		</section>
	);
};

export default Loading;
