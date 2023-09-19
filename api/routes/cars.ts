import api from "../api";

export const getAllCars = async () => {
  const res = await api.get("/cars");
  return res.data;
};

export const getCarById = async (id: number) => {
  const res = await api.get(`cars/${id}`);
  return res.data;
};

export const postCar = async (body: TPOSTCar) => {
  const res = await api.post("/cars", body);
  return res.data;
};
