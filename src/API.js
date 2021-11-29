import axios from "axios";

const fetchUser = async (id, token) => {
   const { data } = await axios.get(`http://localhost:5000/api/v1/user/${id}`, {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const updateUser = async (name, about, location, token) => {
   const { data } = await axios.patch(
      `http://localhost:5000/api/v1/user/update`,
      {
         name,
         about,
         location,
      },
      {
         headers: {
            authorization: `Bearer ${token}`,
         },
      }
   );
   return data;
};

const updateDP = async (formData, token) => {
   const { data } = await axios.patch(
      "http://localhost:5000/api/v1/user/update/dp",
      formData,
      {
         headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
         },
      }
   );
   return data;
};

const fetchPosts = async (token) => {
   const { data } = await axios.get("http://localhost:5000/api/v1/post", {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const createPost = async (formData, token) => {
   const { data } = await axios.post("http://localhost:5000/api/v1/post", formData, {
      headers: {
         "Content-Type": "multipart/form-data",
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const likePost = async (id, token, add) => {
   console.log(id);
   const { data } = await axios.patch(
      `http://localhost:5000/api/v1/post?add=${add}`,
      { id },
      {
         headers: {
            authorization: `Bearer ${token}`,
         },
      }
   );
   return data;
};

export { fetchUser, updateUser, fetchPosts, createPost, updateDP, likePost };
