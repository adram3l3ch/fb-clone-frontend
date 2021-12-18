import React, { useState } from "react";
import { optionsIcon } from "../../assets";
import "./options.css";

const Options = ({ deleteHandler }) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    return (
        <div className="options" onClick={() => setIsOptionsVisible(val => !val)}>
            <img src={optionsIcon} alt="options" />
            <ul className={isOptionsVisible ? "show" : ""}>
                <li
                    onClick={() => {
                        setIsOptionsVisible(false);
                        deleteHandler();
                    }}
                >
                    Delete
                </li>
            </ul>
        </div>
    );
};

export default Options;
