import api from "./api";


export const Getitems = async () => {
  const res = await api.get("/items");
  return res.data;
};
export const Createitem = async (data) => {
  const res = await api.post("/item",data);
  return res.data;
};


export const itemService = {
  Getitems,
  Createitem
};