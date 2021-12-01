import Cookies from "js-cookie";
import React, { useState } from "react";
import { updateDP } from "../../API";
import { useDispatch } from "react-redux";
import "./imageupload.css";
import { update } from "../../features/userSlice";
import { hideModal, showModal } from "../../features/modalSlice";

const ImageUpload = ({ setIsUploading, setUser }) => {
   const [image, setImage] = useState(null);
   const [preview, setPreview] = useState(null);
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
      try {
         dispatch(showModal("Hold on, I swear it won't take so long"));
         const data = await updateDP(formData, token);
         setUser(data.user);
         dispatch(update({ profileImage: data.user.profileImage }));
         setIsUploading(false);
         dispatch(showModal("Sucess"));
      } catch (error) {
         dispatch(showModal(error.response?.data?.msg || "Something went wrong"));
      } finally {
         setTimeout(() => dispatch(hideModal()), 4000);
         setImage(null);
         setPreview(null);
      }
   };
   return (
      <div className="imageupload">
         <form onSubmit={submitHandler}>
            <img src={preview} alt="upload-preview" />
            <div className="btns">
               <label htmlFor="image">Upload</label>
               <input
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={loadImage}
               />
               {image && <button type="submit">Submit</button>}
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     setIsUploading(false);
                  }}
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
};

export default ImageUpload;
