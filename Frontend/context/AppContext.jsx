import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {  

    const [userData, setUserData] = useState(false);

    const getUserData = async ()=>{
        try {
            

            const {data} = await axios.get("https://alpha-gaming-store.onrender.com/alpha-gaming/user/data", { withCredentials: true });
            data.status === 1 ? setUserData(data.userData) : ""
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const value = {
        userData,
        setUserData,
        getUserData
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;