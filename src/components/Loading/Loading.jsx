import axios from "axios";
import React, { useEffect, useState } from "react";
import "./loading.css";

const Loading = () => {
   const [quote, setQuote] = useState("");
   useEffect(() => {
      (async () => {
         const { data } = await axios.get(
            "https://uselessfacts.jsph.pl/random.json?language=en"
         );
         setQuote(data.text);
      })();
   }, []);
   return (
      <section className="loading">
         <div className="loading__circle"></div>
         <h2>Do you know?</h2>
         <p>{quote}</p>
      </section>
   );
};

export default Loading;
