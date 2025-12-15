import api from "./api";


export const authlogin = (data) => api.post("/login",data);
export const register = (data) => api.post("/register", data);


export const authService = {
  authlogin,
  register
};

