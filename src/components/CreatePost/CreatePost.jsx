import React, { useState } from "react";
import { sendIcon, fileIcon } from "../../assets";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../features/modalSlice";
import { createPost } from "../../API";
import Cookies from "js-cookie";
import { pushPost } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import Compress from "compress.js";
import "./createpost.css";

const CreatePost = () => {
    // local states
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const { token } = JSON.parse(Cookies.get("user"));

    const dispatch = useDispatch();
    const customFetch = useFetch();
    const compress = new Compress();

    const loadImage = e => {
        const input = e.target;
        var reader = new FileReader();
        reader.onload = function (e) {
            setPreview(e.target.result);
        };
        input.files[0] && reader.readAsDataURL(input.files[0]);
        const files = [...input.files];
        compress
            .compress(files, {
                size: 1,
                quality: 0.75,
                maxWidth: 1920,
                maxHeight: 1920,
                resize: true,
                rotate: false,
            })
            .then(data => {
                setImage(Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext));
            });
    };

    const submitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);
        dispatch(showModal("Hold on, I swear It wont't take so long"));
        const data = await customFetch(createPost, formData, token);
        if (data) {
            dispatch(pushPost(data.post));
            dispatch(showModal("Post Created"));
            setImage(null);
            setPreview(null);
            setCaption("");
            setTimeout(() => dispatch(hideModal()), 4000);
        }
    };

    return (
        <article className="createpost">
            <form onSubmit={submitHandler}>
                <textarea placeholder="What's on your mind?" value={caption} onChange={e => setCaption(e.target.value)} />
                {preview && <img src={preview} alt="uploaded file" className="uploaded-image" />}
                <div className="btns">
                    <label htmlFor="image" aria-label="select file">
                        <div>
                            <img src={fileIcon} alt="select file" />
                        </div>
                    </label>
                    <input type="file" id="image" accept="image/png, image/jpeg" onChange={loadImage} />
                    <button type="submit" aria-label="submit">
                        <img src={sendIcon} alt="send" />
                    </button>
                </div>
            </form>
        </article>
    );
};

export default CreatePost;
