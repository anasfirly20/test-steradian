import api from "../api";

export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const postOrder = async (body: TPOSTOrder) => {
  const res = await api.post("/orders", body);
  return res.data;
};

export const deleteOrder = async (id: number) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

export const putOrder = async (id: number, body: TPUTOrder) => {
  const res = await api.put(`/orders/${id}`, body);
  return res.data;
};
