import React, { useEffect, useState } from "react";
import { sendIcon, fileIcon } from "../../assets";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import Compress from "compress.js";
import { closeIcon } from "../../assets/index";
import "./createpost.css";

const initialForm = { image: null, preview: null, caption: "" };

const CreatePost = ({ post, id, close }) => {
	// local states
	const [form, setForm] = useState(initialForm);

	useEffect(() => {
		if (post && post._id) {
			setForm({ image: null, preview: post.image?.src, caption: post.caption });
		}
	}, [post]);

	const dispatch = useDispatch();
	const customFetch = useFetch();
	const compress = new Compress();

	const compressImage = async files => {
		const options = { size: 1, quality: 0.75, maxWidth: 1920, maxHeight: 1920, resize: true, rotate: false };
		const data = await compress.compress(files, options);
		return data;
	};

	const loadImage = async e => {
		const input = e.target;
		if (!input) return;
		var reader = new FileReader();
		reader.onload = function (e) {
			setForm(form => ({ ...form, preview: e.target.result }));
		};
		input.files[0] && reader.readAsDataURL(input.files[0]);
		const files = [...input.files];
		const data = await compressImage(files);
		const image = Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext);
		setForm(form => ({ ...form, image }));
	};

	const submitHandler = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", form.image);
		formData.append("caption", form.caption.trim());
		if (post?._id) {
			dispatch(updatePost({ customFetch, id: post._id, formData }));
			close();
		} else {
			dispatch(addPost({ customFetch, formData }));
		}
		setForm(initialForm);
	};

	return (
		<article className="createpost gradient-border">
			<form onSubmit={submitHandler}>
				<textarea
					placeholder="What's on your mind?"
					value={form.caption}
					onChange={e => setForm({ ...form, caption: e.target.value })}
				/>
				{form.preview && (
					<div className="uploaded-image">
						<img src={form.preview} alt="uploaded file" />
						<div className="close-icon" onClick={() => setForm({ ...form, image: null, preview: null })}>
							<img src={closeIcon} alt="remove" />
						</div>
					</div>
				)}
				<div className="btns">
					<label htmlFor={id || "image"} aria-label="select file">
						<div>
							<img src={fileIcon} alt="select file" />
						</div>
					</label>
					<input type="file" id={id || "image"} accept="image/png, image/jpeg" onChange={loadImage} />
					<button type="submit" aria-label="submit">
						<img src={sendIcon} alt="send" />
					</button>
				</div>
			</form>
		</article>
	);
};

export default CreatePost;
