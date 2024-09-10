import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


export const useLogout = () => {
  const [loading, setLodaing] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLodaing(true);
    try {
      const res = await axios.post("/api/auth/logout", {});
      if (res.data.error) throw new Error(res.data.error);
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLodaing(false);
    }
  };
  return { loading, logout };
};
