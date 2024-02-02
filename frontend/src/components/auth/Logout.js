// components/auth/Logout.js
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Logout = ( { setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;        
        navigate("/");
        setUser(null);
    }, [navigate, setUser]);

    return (
        <div></div>
    )
};

export default Logout;