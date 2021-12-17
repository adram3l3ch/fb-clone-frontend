import React, { useState } from "react";
import { sendIcon } from "../../assets";
import "./input.css";

const Input = ({ placeholder, handler }) => {
    const submitHandler = async e => {
        e.preventDefault();
        setValue("");
        if (value) await handler(value);
    };

    const [value, setValue] = useState("");
    return (
        <form className="input__box" onSubmit={submitHandler}>
            <input type="text" placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
            <button type="submit" aria-label="submit">
                <img src={sendIcon} alt="send" />
            </button>
        </form>
    );
};

export default Input;
