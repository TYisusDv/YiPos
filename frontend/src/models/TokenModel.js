export const GetTokenModel = async () => {
    try {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
        
        if(!authToken){
            return {
                "success": false,
                "authToken": null
            }
        }

        return {
            "success": true,
            "authToken": authToken
        }
    } catch(error) {
        return {
            "success": false,
            "authToken": null
        }
    }
};