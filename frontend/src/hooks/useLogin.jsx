import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = ()=>{
    
    const [loading,setLoading]=useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username,password)=>{
        const success =  handleInputError(username,password);
        if(!success) return;
        setLoading(true);
        try {
            const res =  await axios.post("/api/auth/login",{
                username,
                password
            })
            if(res.data.error) throw new Error(res.data.error);
            localStorage.setItem("chat-user",JSON.stringify(res.data));
            setAuthUser(res.data);

            
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }

    }
    return {loading,login};

}

const handleInputError = (username,password)=>{
    if(!username) {
        toast.error("Please enter a username");
        return false;
    }
    if(!password) {
        toast.error("Please enter a password");
        return false;
    }
    return true;
 
}