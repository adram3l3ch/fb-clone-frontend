import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../API";
import Chat from "../../components/Chat/Chat";
import CreatePost from "../../components/CreatePost/CreatePost";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import { setPosts } from "../../features/postSlice";
import "./home.css";

const Home = () => {
   const { token } = JSON.parse(Cookies.get("user"));
   const dispatch = useDispatch();
   const { posts } = useSelector((state) => state.post);

   useEffect(() => {
      (async () => {
         const data = await fetchPosts(token);
         dispatch(setPosts(data.posts));
      })();
   }, [dispatch, token]);

   return (
      <section className="home">
         <div className="home__left">
            <div>
               <CreatePost />
               {posts.map((post) => (
                  <Post post={post} />
               ))}
            </div>
         </div>
         <div className="home__right">
            <div>
               <Online />
               <Chat />
            </div>
         </div>
      </section>
   );
};

export default Home;
