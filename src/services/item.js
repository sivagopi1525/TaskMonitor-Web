import api from "./api";


export const Getitems = async () => {
  const res = await api.get("/items");
  return res.data;
};


export const itemService = {
  Getitems,
};