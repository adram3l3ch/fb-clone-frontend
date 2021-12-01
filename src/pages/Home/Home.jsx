import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../API";
import Chat from "../../components/Chat/Chat";
import CreatePost from "../../components/CreatePost/CreatePost";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import { hideModal, showModal } from "../../features/modalSlice";
import { setPosts } from "../../features/postSlice";
import "./home.css";

const Home = () => {
   const { token } = JSON.parse(Cookies.get("user"));
   const dispatch = useDispatch();
   const { posts } = useSelector((state) => state.post);
   const { isSidebarVisible } = useSelector((state) => state.modal);

   useEffect(() => {
      try {
         (async () => {
            const data = await fetchPosts(token);
            dispatch(setPosts(data.posts));
         })();
      } catch (error) {
         dispatch(showModal("Something went wrong"));
         setTimeout(() => dispatch(hideModal()), 4000);
      }
   }, [dispatch, token]);

   return (
      <section className="home">
         <article className="home__left">
            <div>
               <CreatePost />
               {posts.map((post) => (
                  <Post post={post} key={post._id} />
               ))}
            </div>
         </article>
         <article className={isSidebarVisible ? "home__right visible" : "home__right"}>
            <div>
               <Online />
               <Chat />
            </div>
         </article>
      </section>
   );
};

export default Home;
