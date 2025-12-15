import  axios  from "axios";

const BASE_URL = "https://rest-api-s-server-1.onrender.com/api";

export  async function authlogin(body){
    const result =await axios.post(`${BASE_URL}/login`,body)
    return result?.data
}

export async function register(body){
    const result = await axios.post(`${BASE_URL}/register`,body)
    return result?.data
}

export const authService = {
  authlogin,
  register
};

