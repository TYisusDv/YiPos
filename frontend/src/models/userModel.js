
export const userModelCheck = async () => {
  try {
    const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    let dataUser = null;

    if (authToken) {
      const response = await fetch("http://127.0.0.1:8000/api/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`,
        },
      });

      if (response.ok) {
        dataUser = await response.json();
        return {
          "success": true,
          "msg": "Exit",
          "dataUser": dataUser,
        };
      }       
    }

    return {
      "success": false,
      "msg": "Error",
    };  
  } catch (error) {
    return {
      "success": false,
      "msg": "Error",
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

    if (response.ok) {
      const responseData = await response.json();
      
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      document.cookie = `authToken=${responseData.token}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;

      return {
        "success": true,
        "msg": "Error",
      };
    }

    return {
      "success": false,
      "msg": "Error",
    };  
  } catch (error) {
    return {
      "success": false,
      "msg": "Error",
    };
  }
};