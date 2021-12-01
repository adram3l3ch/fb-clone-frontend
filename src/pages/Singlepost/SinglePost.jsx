import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import Comments from "../../components/Comments/Comments";
import "./singlepost.css";
import Post from "../../components/Post/Post";
import Online from "../../components/Online/Online";
import Chat from "../../components/Chat/Chat";
import { fetchPost, commentPost } from "../../API";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSinglePost } from "../../features/postSlice";

const SinglePost = () => {
   const { id } = useParams();
   const { token } = JSON.parse(Cookies.get("user"));
   const dispatch = useDispatch();
   const { singlePost: post } = useSelector((state) => state.post);

   useEffect(() => {
      try {
         (async () => {
            const data = await fetchPost(id, token);
            dispatch(setSinglePost(data.posts));
         })();
      } catch (error) {}
   }, [id, token, dispatch]);

   const commentHandler = async (comment) => {
      try {
         const data = await commentPost(post._id, comment, token);
         dispatch(setSinglePost(data.posts));
      } catch (error) {}
   };

   return (
      <section className="singlepost">
         <div className="singlepost__left">
            {post._id && <Post singlepost={true} post={post} />}
         </div>
         <div className="singlepost__comments">
            <div>
               <Comments post={post} />
               <Input placeholder="Write a comment..." handler={commentHandler} />
            </div>
         </div>
         <div className="singlepost__right">
            <div>
               <Online />
               <Chat />
            </div>
         </div>
      </section>
   );
};

export default SinglePost;
