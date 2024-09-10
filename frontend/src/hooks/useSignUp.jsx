import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const {authUser,setAuthUser} = useAuthContext();

  const signup = async ({
    fullName,
    password,
    confirmPassword,
    username,
    gender,
  }) => {
    const success = handleError({
      fullName,
      password,
      confirmPassword,
      username,
      gender,
    });

    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", {
        fullName,
        password,
        confirmPassword,
        username,
        gender,
      });
      if(res.data.error) throw new Error(res.data.error);

      localStorage.setItem("chat-user",JSON.stringify(res.data));
      setAuthUser(res.data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {loading, signup};
};
function handleError({
  fullName,
  password,
  confirmPassword,
  username,
  gender,
}) {
  if (!fullName || !password || !confirmPassword || !username || !gender) {
    toast.error("Please fill all the given fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password should be at least 6 characters long");
    return false;
  }
  return true;
}
