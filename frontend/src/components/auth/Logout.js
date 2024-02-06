// components/auth/Logout.js
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Logout = ( { setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove('authToken');
        navigate("/");
        setUser(null);
    }, [navigate, setUser]);

    return (
        <div></div>
    )
};

export default Logout;