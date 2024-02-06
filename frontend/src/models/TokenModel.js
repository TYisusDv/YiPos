import Cookies from 'js-cookie';

export const GetTokenModel = async () => {
    try {
        const authToken = Cookies.get('authToken');
        
        if(!authToken){
            return {
                "success": false,
                "authToken": "El token aún no está disponible."
            }
        }

        return {
            "success": true,
            "authToken": authToken
        }
    } catch(error) {
        return {
            "success": false,
            "authToken": "Ocurrió un error."
        }
    }
};