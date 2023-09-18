import api from "../api";

export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const postOrder = async (body: TPOSTOrder) => {
  const res = await api.post("/orders", body);
  return res.data;
};
