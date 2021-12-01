import axios from "axios";
const API_ENDPOINT = "http://192.168.65.165:5000/api/v1";

const loginUser = async (email, password) => {
   const { data } = await axios.post(`${API_ENDPOINT}/auth/login`, {
      email,
      password,
   });
   return data;
};

const registerUser = async (name, email, password, dob) => {
   const { data } = await axios.post(`${API_ENDPOINT}/auth/register`, {
      name,
      password,
      email,
      dob,
   });
   return data;
};

const fetchUser = async (id, token) => {
   const { data } = await axios.get(`${API_ENDPOINT}/user/${id}`, {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const fetchUsersByIDs = async (ids, token) => {
   if (ids) {
      let queryString = ids.reduce((str, id, i) => {
         return (str += `user${i}=${id}&`);
      }, "");
      const { data } = await axios.get(`${API_ENDPOINT}/user/multiple?${queryString}`, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
      return data;
   }
};

const fetchUsers = async (token, query) => {
   if (query) {
      const { data } = await axios.get(`${API_ENDPOINT}/user?search=${query}`, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
      return data;
   }
   const { data } = await axios.get(`${API_ENDPOINT}/user`, {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const updateUser = async (name, about, location, token) => {
   const { data } = await axios.patch(
      `${API_ENDPOINT}/user/update`,
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
   const { data } = await axios.patch(`${API_ENDPOINT}/user/update/dp`, formData, {
      headers: {
         "Content-Type": "multipart/form-data",
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const fetchPosts = async (token, id, query) => {
   if (id) {
      const { data } = await axios.get(`${API_ENDPOINT}/post?by=${id}`, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
      return data;
   }
   if (query) {
      const { data } = await axios.get(`${API_ENDPOINT}/post?search=${query}`, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
      return data;
   }
   const { data } = await axios.get(`${API_ENDPOINT}/post`, {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const fetchPost = async (id, token) => {
   const { data } = await axios.get(`${API_ENDPOINT}/post/${id}`, {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const createPost = async (formData, token) => {
   const { data } = await axios.post(`${API_ENDPOINT}/post`, formData, {
      headers: {
         "Content-Type": "multipart/form-data",
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const likePost = async (id, token, add) => {
   const { data } = await axios.patch(
      `${API_ENDPOINT}/post/like?add=${add}`,
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
      `${API_ENDPOINT}/post/comment`,
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
   fetchUsersByIDs,
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
