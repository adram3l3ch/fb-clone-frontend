import React, { useState } from "react";
import "./createpost.css";
import plane from "../../assets/plane.svg";
import file from "../../assets/file.png";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../features/modalSlice";
import { createPost } from "../../API";
import Cookies from "js-cookie";
import { pushPost } from "../../features/postSlice";

const CreatePost = () => {
   const [image, setImage] = useState(null);
   const [preview, setPreview] = useState(null);
   const [caption, setCaption] = useState("");
   const { token } = JSON.parse(Cookies.get("user"));
   const dispatch = useDispatch();

   const loadImage = (e) => {
      const input = e.target;
      var reader = new FileReader();
      reader.onload = function (e) {
         setPreview(e.target.result);
      };
      input.files[0] && reader.readAsDataURL(input.files[0]);
      setImage(input.files[0]);
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      try {
         const data = await createPost(formData, token);
         dispatch(pushPost(data.post));
         dispatch(showModal("Post Created"));
      } catch (error) {
         const { msg } = error.response?.data || "Error";
         dispatch(showModal(msg));
      } finally {
         setImage(null);
         setPreview(null);
         setCaption("");
         setTimeout(() => dispatch(hideModal()), 4000);
      }
   };

   return (
      <article className="createpost">
         <form onSubmit={submitHandler}>
            <textarea
               placeholder="What's on your mind?"
               value={caption}
               onChange={(e) => setCaption(e.target.value)}
            />
            {preview && (
               <img src={preview} alt="uploaded file" className="uploaded-image" />
            )}
            <div className="btns">
               <label htmlFor="image">
                  <div>
                     <img src={file} alt="" />
                  </div>
               </label>
               <input
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={loadImage}
               />
               <button type="submit">
                  <img src={plane} alt="" />
               </button>
            </div>
         </form>
      </article>
   );
};

export default CreatePost;
