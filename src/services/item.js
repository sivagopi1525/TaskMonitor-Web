import api from "./api";


export const Getitems = async () => {
  const res = await api.get("/items");
  return res.data;
};
export const Createitem = async (data) => {
  const res = await api.post("/item",data);
  return res.data;
};
export const Deleteitem = async (id) => {
  const res = await api.delete(`/item?id=${id}`);
  return res.data;
};
export  const Edititem= async (id,body)=>{
    const res = await api.put(`/item?id=${id}`,body);
  return res.data;
}



export const itemService = {
  Getitems,
  Createitem,
  Deleteitem,
  Edititem,
};