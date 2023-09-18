import api from "../api";

export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};
