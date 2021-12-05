import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../features/modalSlice";

const useFetch = () => {
   const dispatch = useDispatch();
   return useCallback(
      async (callback, ...props) => {
         try {
            return await callback(...props);
         } catch (error) {
            const { msg } = error.response?.data || "Something went wrong";
            dispatch(showModal(msg));
            setTimeout(() => dispatch(hideModal()), 3000);
         }
      },
      [dispatch]
   );
};

export default useFetch;
