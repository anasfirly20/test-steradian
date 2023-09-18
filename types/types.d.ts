type TGETUsers = {
  id: number;
  email: string;
  phoneNumber: string;
  city: string;
  zip: number;
  message: string;
  password: string;
  username: string;
  address: string;
};

type TGETAdmin = {
  id: number;
  email: string;
  password: string;
};

type TGETOrderById = {
  id: number;
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  userId: number;
  adminId: number;
};

type TGETOrders = {
  id: number;
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  car: TGETCars[];
  user: TGETUsers;
  admin: TGETAdmin;
};

type TGETCars = {
  id: number;
  name: string;
  carType: string;
  rating: number;
  fuel: string;
  image: string;
  hourRate: string;
  dayRate: string;
  monthRate: string;
  orderId: number;
};
