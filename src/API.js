import axios from "axios";

const loginUser = async (email, password) => {
   const { data } = await axios.post("http://localhost:5000/api/v1/auth/login", {
      email,
      password,
   });
   return data;
};

const registerUser = async (name, email, password, dob) => {
   const { data } = await axios.post("http://localhost:5000/api/v1/auth/register", {
      name,
      password,
      email,
      dob,
   });
   return data;
};

const fetchUser = async (id, token) => {
   const { data } = await axios.get(`http://localhost:5000/api/v1/user/${id}`, {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const fetchUsers = async (token) => {
   const { data } = await axios.get(`http://localhost:5000/api/v1/user`, {
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

const fetchPosts = async (token, id) => {
   if (id) {
      const { data } = await axios.get(`http://localhost:5000/api/v1/post?by=${id}`, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
      return data;
   }
   const { data } = await axios.get("http://localhost:5000/api/v1/post", {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const fetchPost = async (id, token) => {
   const { data } = await axios.get(`http://localhost:5000/api/v1/post/${id}`, {
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
   const { data } = await axios.patch(
      `http://localhost:5000/api/v1/post/like?add=${add}`,
      { id },
      {
         headers: {
            authorization: `Bearer ${token}`,
         },
      }
   );
   return data;
};

const commentPost = async (id, comment, token) => {
   const { data } = await axios.patch(
      `http://localhost:5000/api/v1/post/comment`,
      { id, comment },
      {
         headers: {
            authorization: `Bearer ${token}`,
         },
      }
   );
   return data;
};

export {
   fetchUser,
   fetchUsers,
   updateUser,
   fetchPosts,
   fetchPost,
   createPost,
   updateDP,
   likePost,
   loginUser,
   registerUser,
   commentPost,
};
