
export const userModelCheck = async () => {
  try {
    const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (authToken) {
      const response = await fetch("http://127.0.0.1:8000/api/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`,
        },
      });

      const responseJson = await response.json();

      if (response.ok) {  
        if(responseJson.success){     
          return {
            "success": true,
            "msg": responseJson.msg,
            "user": responseJson.user
          };
        }
      } 
      
      return {
        "success": false,
        "msg": responseJson.msg,
      };  
    }

    return {
      "success": false,
      "msg": "Error 1",
    };  
  } catch (error) {
    return {
      "success": false,
      "msg": "Error 2",
    };
  }
};

export const userModelAuth = async (username, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const responseJson = await response.json();

    if (response.ok) {
      if(responseJson.success){
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        document.cookie = `authToken=${responseJson.token}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;
  
        return {
          "success": true,
          "msg": responseJson.msg,
        };
      }    
    }

    return {
      "success": false,
      "msg": responseJson.msg,
    };  
  } catch (error) {
    return {
      "success": false,
      "msg": "Error " + error,
    };
  }
};