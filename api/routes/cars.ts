import api from "../api";

export const getAllCars = async () => {
  const res = await api.get("/cars");
  return res.data;
};
