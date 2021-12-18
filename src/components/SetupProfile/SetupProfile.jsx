import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../features/userSlice";
import { setPosts } from "../../features/postSlice";
import { hideModal, showModal } from "../../features/modalSlice";
import { updateUser } from "../../API";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import "./setupprofile.css";

const SetupProfile = ({ setIsEditing, user, setUser }) => {
    const [name, setName] = useState(user.name);
    const [about, setAbout] = useState(user.about);
    const [location, setLocation] = useState(user.location);
    const { token } = JSON.parse(Cookies.get("user"));

    const dispatch = useDispatch();
    const customFetch = useFetch();

    const clickHandler = async e => {
        e.preventDefault();
        const data = await customFetch(updateUser, name, about, location, token);
        if (data) {
            setUser(data.user);
            setIsEditing(false);
            dispatch(update({ name: data.user.name }));
            dispatch(setPosts(data.posts));
            dispatch(showModal("Success"));
            setTimeout(() => dispatch(hideModal()), 4000);
        }
    };

    return (
        <div className="setup">
            <form onSubmit={clickHandler}>
                <label htmlFor="">Username</label>
                <input
                    type="text"
                    value={name}
                    required
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <label htmlFor="">About</label>
                <input
                    type="text"
                    value={about}
                    onChange={e => {
                        setAbout(e.target.value);
                    }}
                />
                <label htmlFor="">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={e => {
                        setLocation(e.target.value);
                    }}
                />
                <button type="submit">Continue</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
        </div>
    );
};

export default SetupProfile;
